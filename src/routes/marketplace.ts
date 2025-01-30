import express from 'express';
import { MarketplaceService } from '../services/MarketplaceService';
import { AuthService } from '../services/AuthService';
import { authMiddleware } from '../middleware/auth';

export const createMarketplaceRouter = (
    marketplaceService: MarketplaceService,
    authService: AuthService
) => {
    const router = express.Router();

    // Apply auth middleware to all marketplace routes
    router.use(authMiddleware(authService));

    // Get available rewards
    router.get('/rewards', async (req, res) => {
        try {
            const rewards = await marketplaceService.getAvailableRewards();
            res.json(rewards);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });

    // Redeem a reward
    router.post('/rewards/:rewardId/redeem', async (req, res) => {
        try {
            const user = await authService.getUserById(req.user.userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const redemption = await marketplaceService.redeemReward(user, req.params.rewardId);
            res.json(redemption);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    });

    // Get user's redemption history
    router.get('/redemptions', async (req, res) => {
        try {
            const redemptions = await marketplaceService.getUserRedemptions(req.user.userId);
            res.json(redemptions);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });

    return router;
}; 