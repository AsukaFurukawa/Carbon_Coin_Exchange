import { DataSource } from 'typeorm';
import { User } from '../entities/User';
import { Activity } from '../entities/Activity';
import { Merchant } from '../entities/Merchant';
import { Reward } from '../entities/Reward';
import { Redemption } from '../entities/Redemption';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'carboncoin',
    synchronize: process.env.NODE_ENV !== 'production',
    logging: process.env.NODE_ENV !== 'production',
    entities: [User, Activity, Merchant, Reward, Redemption],
    migrations: [],
    subscribers: [],
}); 