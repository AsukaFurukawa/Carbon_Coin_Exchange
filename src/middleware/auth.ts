import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/AuthService';

export const authMiddleware = (authService: AuthService) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) {
                return res.status(401).json({ message: 'No token provided' });
            }

            const decoded = await authService.validateToken(token);
            req.user = decoded;
            next();
        } catch (error) {
            res.status(401).json({ message: 'Invalid token' });
        }
    };
}; 