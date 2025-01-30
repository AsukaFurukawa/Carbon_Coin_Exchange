import express from 'express';
import { VerificationService } from '../services/VerificationService';
import { AuthService } from '../services/AuthService';
import { ActivityService } from '../services/ActivityService';
import { authMiddleware } from '../middleware/auth';

export const createVerificationRouter = (
    verificationService: VerificationService,
    authService: AuthService,
    activityService: ActivityService
) => {
    const router = express.Router();

    // Apply auth middleware
    router.use(authMiddleware(authService));

    // Submit activity for verification
    router.post('/verify/:activityId', async (req, res) => {
        try {
            const activity = await activityService.getActivityById(req.params.activityId);
            
            if (!activity) {
                return res.status(404).json({ message: 'Activity not found' });
            }

            if (activity.userId !== req.user.userId) {
                return res.status(403).json({ message: 'Unauthorized' });
            }

            const verificationResult = await verificationService.verifyActivity(activity);
            res.json(verificationResult);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    });

    return router;
}; 