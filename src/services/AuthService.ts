import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../config/database';
import { User } from '../entities/User';
import { IUserRegistration, IUserLogin } from '../types/user';

export class AuthService {
    private userRepository = AppDataSource.getRepository(User);

    async register(registration: IUserRegistration): Promise<User> {
        // Check if user already exists
        const existingUser = await this.userRepository.findOne({
            where: { email: registration.email }
        });

        if (existingUser) {
            throw new Error('User already exists');
        }

        // Hash password
        const passwordHash = await bcrypt.hash(registration.password, 10);

        // Create new user
        const user = this.userRepository.create({
            email: registration.email,
            passwordHash,
            name: registration.name,
            walletAddress: uuidv4(), // In real app, this would be a blockchain wallet address
            carbonCoins: 0
        });

        return this.userRepository.save(user);
    }

    async login(credentials: IUserLogin): Promise<string> {
        const user = await this.userRepository.findOne({
            where: { email: credentials.email }
        });

        if (!user) {
            throw new Error('User not found');
        }

        const isValid = await bcrypt.compare(credentials.password, user.passwordHash);
        if (!isValid) {
            throw new Error('Invalid password');
        }

        // Generate JWT token
        return jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '24h' }
        );
    }

    async validateToken(token: string): Promise<{ userId: string; email: string }> {
        try {
            return jwt.verify(
                token, 
                process.env.JWT_SECRET || 'your-secret-key'
            ) as { userId: string; email: string };
        } catch (error) {
            throw new Error('Invalid token');
        }
    }

    async getUserById(userId: string): Promise<User | null> {
        return this.userRepository.findOne({
            where: { id: userId }
        });
    }
} 