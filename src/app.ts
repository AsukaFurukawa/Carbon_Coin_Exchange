import express from 'express';
import cors from 'cors';
import { createAuthRouter } from './routes/auth';
import { createMarketplaceRouter } from './routes/marketplace';
import { AuthService } from './services/AuthService';
import { MarketplaceService } from './services/MarketplaceService';
import { ActivityService } from './services/ActivityService';
import { TokenService } from './services/TokenService';
import { RewardCalculator } from './services/RewardCalculator';
import { createVerificationRouter } from './routes/verification';
import { VerificationService } from './services/VerificationService';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Services
const authService = new AuthService();
const marketplaceService = new MarketplaceService();
const activityService = new ActivityService();
const rewardCalculator = new RewardCalculator();
const tokenService = new TokenService();

// Initialize verification service
const verificationService = new VerificationService(tokenService, authService);

// Routes
app.use('/auth', createAuthRouter(authService));
app.use('/marketplace', createMarketplaceRouter(marketplaceService, authService));
app.use('/verification', createVerificationRouter(verificationService, authService, activityService));

// Error handling
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

export default app; 