import { AppDataSource } from '../config/database';
import { Merchant } from '../entities/Merchant';
import { Reward } from '../entities/Reward';
import { Redemption } from '../entities/Redemption';
import { User } from '../entities/User';
import { v4 as uuidv4 } from 'uuid';

export class MarketplaceService {
    private merchantRepository = AppDataSource.getRepository(Merchant);
    private rewardRepository = AppDataSource.getRepository(Reward);
    private redemptionRepository = AppDataSource.getRepository(Redemption);
    private userRepository = AppDataSource.getRepository(User);

    async createReward(merchantId: string, rewardData: Partial<Reward>): Promise<Reward> {
        const merchant = await this.merchantRepository.findOneBy({ id: merchantId });
        if (!merchant || !merchant.isVerified) {
            throw new Error('Merchant not found or not verified');
        }

        const reward = this.rewardRepository.create({
            ...rewardData,
            merchant,
            merchantId,
            isActive: true,
            currentRedemptions: 0
        });

        return this.rewardRepository.save(reward);
    }

    async getAvailableRewards(): Promise<Reward[]> {
        const now = new Date();
        return this.rewardRepository.find({
            where: {
                isActive: true,
                validUntil: MoreThan(now)
            },
            relations: ['merchant']
        });
    }

    async redeemReward(userId: string, rewardId: string): Promise<Redemption> {
        // Use transaction to ensure data consistency
        return AppDataSource.transaction(async transactionalEntityManager => {
            const reward = await transactionalEntityManager.findOne(Reward, {
                where: { id: rewardId },
                lock: { mode: 'pessimistic_write' } // Lock the reward record
            });

            if (!reward) {
                throw new Error('Reward not found');
            }

            if (!reward.isActive || reward.validUntil < new Date()) {
                throw new Error('Reward is no longer available');
            }

            if (reward.currentRedemptions >= reward.maxRedemptions) {
                throw new Error('Reward redemption limit reached');
            }

            const user = await transactionalEntityManager.findOne(User, {
                where: { id: userId },
                lock: { mode: 'pessimistic_write' } // Lock the user record
            });

            if (!user) {
                throw new Error('User not found');
            }

            if (user.carbonCoins < reward.coinsCost) {
                throw new Error('Insufficient carbon coins');
            }

            // Create redemption
            const redemption = this.redemptionRepository.create({
                user,
                userId,
                reward,
                rewardId,
                coinsSpent: reward.coinsCost,
                redemptionCode: this.generateRedemptionCode(),
                isUsed: false
            });

            // Update user's coin balance
            user.carbonCoins -= reward.coinsCost;

            // Update reward redemption count
            reward.currentRedemptions += 1;

            // Save all changes in transaction
            await transactionalEntityManager.save(user);
            await transactionalEntityManager.save(reward);
            return transactionalEntityManager.save(redemption);
        });
    }

    async getUserRedemptions(userId: string): Promise<Redemption[]> {
        return this.redemptionRepository.find({
            where: { userId },
            relations: ['reward', 'reward.merchant'],
            order: { redeemedAt: 'DESC' }
        });
    }

    private generateRedemptionCode(): string {
        return Math.random().toString(36).substring(2, 10).toUpperCase();
    }
} 