import { AuthService } from '../../services/AuthService';
import { AppDataSource } from '../../config/database';
import { User } from '../../entities/User';

describe('AuthService', () => {
    let authService: AuthService;
    
    beforeEach(async () => {
        // Clear users table before each test
        await AppDataSource.getRepository(User).clear();
        authService = new AuthService();
    });

    describe('register', () => {
        it('should successfully register a new user', async () => {
            const userData = {
                email: 'test@example.com',
                password: 'password123',
                name: 'Test User'
            };

            const user = await authService.register(userData);

            expect(user).toBeDefined();
            expect(user.email).toBe(userData.email);
            expect(user.name).toBe(userData.name);
            expect(user.passwordHash).not.toBe(userData.password);
            expect(user.walletAddress).toBeDefined();
        });

        it('should throw error for duplicate email', async () => {
            const userData = {
                email: 'test@example.com',
                password: 'password123',
                name: 'Test User'
            };

            await authService.register(userData);

            await expect(authService.register(userData)).rejects.toThrow('User already exists');
        });
    });

    describe('login', () => {
        it('should successfully login with correct credentials', async () => {
            const userData = {
                email: 'test@example.com',
                password: 'password123',
                name: 'Test User'
            };

            await authService.register(userData);

            const token = await authService.login({
                email: userData.email,
                password: userData.password
            });

            expect(token).toBeDefined();
            expect(typeof token).toBe('string');
        });

        it('should throw error for invalid password', async () => {
            const userData = {
                email: 'test@example.com',
                password: 'password123',
                name: 'Test User'
            };

            await authService.register(userData);

            await expect(authService.login({
                email: userData.email,
                password: 'wrongpassword'
            })).rejects.toThrow('Invalid password');
        });
    });
}); 