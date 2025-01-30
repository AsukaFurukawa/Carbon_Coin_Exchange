import { AppDataSource } from '../config/database';
import { config } from '../config/config';

beforeAll(async () => {
    // Override config for test environment
    process.env.NODE_ENV = 'test';
    process.env.DB_NAME = 'carboncoin_test';

    // Initialize test database connection
    await AppDataSource.initialize();
});

afterAll(async () => {
    // Close database connection
    await AppDataSource.destroy();
}); 