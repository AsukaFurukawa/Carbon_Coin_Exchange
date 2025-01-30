import { AppDataSource } from '../config/database';
import { User } from '../entities/User';
import { Activity } from '../entities/Activity';
import { RewardCalculator } from './RewardCalculator';
import { EthNetEmissionsTokenGateway } from '@blockchain-carbon-accounting/blockchain-gateway-lib';
import { VerificationStatus } from '../types/verification';

export class TokenService {
    private userRepository = AppDataSource.getRepository(User);
    private activityRepository = AppDataSource.getRepository(Activity);

    constructor(
        private rewardCalculator: RewardCalculator,
        private tokenGateway: EthNetEmissionsTokenGateway
    ) {}

    async awardTokens(activityId: string): Promise<number> {
        return AppDataSource.transaction(async transactionalEntityManager => {
            const activity = await transactionalEntityManager.findOne(Activity, {
                where: { id: activityId },
                relations: ['user'],
                lock: { mode: 'pessimistic_write' }
            });

            if (!activity) {
                throw new Error('Activity not found');
            }

            if (activity.verificationStatus !== VerificationStatus.APPROVED) {
                throw new Error('Activity not verified');
            }

            const rewardAmount = this.rewardCalculator.calculateReward(activity);
            
            if (rewardAmount <= 0) {
                return 0;
            }

            try {
                // Issue tokens on the blockchain
                await this.tokenGateway.issue({
                    issuedFrom: process.env.ISSUER_ADDRESS || '',
                    issuedTo: activity.user.walletAddress,
                    quantity: BigInt(Math.floor(rewardAmount * 1000000)), // Convert to smallest unit
                    fromDate: activity.timestamp.getTime(),
                    thruDate: new Date().getTime(),
                    metadata: JSON.stringify(activity),
                    manifest: '',
                    description: `Reward for ${activity.activityType}`
                });

                // Update user's balance in database
                activity.user.carbonCoins += rewardAmount;
                await transactionalEntityManager.save(activity.user);
                
                return rewardAmount;
            } catch (error) {
                console.error('Failed to issue tokens:', error);
                throw new Error('Failed to issue tokens');
            }
        });
    }

    async getBalance(userId: string): Promise<number> {
        const user = await this.userRepository.findOneBy({ id: userId });
        if (!user) {
            throw new Error('User not found');
        }
        return user.carbonCoins;
    }

    async syncBalanceWithBlockchain(userId: string): Promise<void> {
        // This method would sync the user's balance with the blockchain
        // Implementation depends on specific blockchain integration requirements
        throw new Error('Not implemented');
    }
} 