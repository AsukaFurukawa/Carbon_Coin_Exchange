import express from 'express';
import { AuthService } from '../services/AuthService';

export const createAuthRouter = (authService: AuthService) => {
    const router = express.Router();

    /**
     * @swagger
     * /auth/register:
     *   post:
     *     summary: Register a new user
     *     tags: [Auth]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - email
     *               - password
     *               - name
     *             properties:
     *               email:
     *                 type: string
     *                 format: email
     *               password:
     *                 type: string
     *                 minimum: 6
     *               name:
     *                 type: string
     *     responses:
     *       200:
     *         description: User successfully registered
     *       400:
     *         description: Invalid input or user already exists
     */
    router.post('/register', async (req, res) => {
        try {
            const user = await authService.register(req.body);
            res.json({ 
                id: user.id,
                email: user.email,
                name: user.name,
                walletAddress: user.walletAddress
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    });

    /**
     * @swagger
     * /auth/login:
     *   post:
     *     summary: Login user
     *     tags: [Auth]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - email
     *               - password
     *             properties:
     *               email:
     *                 type: string
     *                 format: email
     *               password:
     *                 type: string
     *     responses:
     *       200:
     *         description: Login successful
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 token:
     *                   type: string
     *       401:
     *         description: Invalid credentials
     */
    router.post('/login', async (req, res) => {
        try {
            const token = await authService.login(req.body);
            res.json({ token });
        } catch (error) {
            res.status(401).json({ message: error.message });
        }
    });

    return router;
}; 