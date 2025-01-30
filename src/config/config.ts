import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const configSchema = z.object({
    // Server
    PORT: z.string().default('3000'),
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

    // Database
    DB_HOST: z.string().default('localhost'),
    DB_PORT: z.string().default('5432'),
    DB_USERNAME: z.string().default('postgres'),
    DB_PASSWORD: z.string(),
    DB_NAME: z.string().default('carboncoin'),

    // JWT
    JWT_SECRET: z.string(),
    JWT_EXPIRES_IN: z.string().default('24h'),

    // Blockchain
    ISSUER_ADDRESS: z.string(),
    BLOCKCHAIN_RPC_URL: z.string(),

    // Admin
    ADMIN_EMAIL: z.string().default('admin@carboncoin.com'),
    ADMIN_PASSWORD: z.string(),
    ADMIN_WALLET_ADDRESS: z.string(),
});

type Config = z.infer<typeof configSchema>;

function validateConfig(config: Record<string, unknown>): Config {
    try {
        return configSchema.parse(config);
    } catch (error) {
        console.error('Invalid configuration:', error);
        process.exit(1);
    }
}

export const config = validateConfig(process.env); 