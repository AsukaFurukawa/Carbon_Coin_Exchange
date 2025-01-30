import { AppDataSource } from './database';
import { User } from '../entities/User';
import { Merchant } from '../entities/Merchant';
import { MerchantCategory } from '../types/marketplace';
import bcrypt from 'bcryptjs';

export async function initializeDatabase() {
    try {
        // Initialize the database connection
        await AppDataSource.initialize();
        console.log('Database connection initialized');

        // Create admin user if it doesn't exist
        const adminEmail = process.env.ADMIN_EMAIL || 'admin@carboncoin.com';
        const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
        
        const userRepository = AppDataSource.getRepository(User);
        const existingAdmin = await userRepository.findOneBy({ email: adminEmail });

        if (!existingAdmin) {
            const admin = userRepository.create({
                email: adminEmail,
                passwordHash: await bcrypt.hash(adminPassword, 10),
                name: 'Admin',
                walletAddress: process.env.ADMIN_WALLET_ADDRESS || '',
                carbonCoins: 0
            });
            await userRepository.save(admin);
            console.log('Admin user created');
        }

        // Create sample merchants if none exist
        const merchantRepository = AppDataSource.getRepository(Merchant);
        const merchantCount = await merchantRepository.count();

        if (merchantCount === 0) {
            const sampleMerchants = [
                {
                    name: 'Eco Fashion Store',
                    description: 'Sustainable fashion and accessories',
                    website: 'https://ecofashion.example.com',
                    address: '123 Green St, Eco City',
                    category: MerchantCategory.SUSTAINABLE_FASHION,
                    isVerified: true
                },
                {
                    name: 'Green Transport Co',
                    description: 'Public transportation services',
                    website: 'https://greentransport.example.com',
                    address: '456 Transit Ave, Eco City',
                    category: MerchantCategory.PUBLIC_TRANSPORT,
                    isVerified: true
                }
            ];

            for (const merchantData of sampleMerchants) {
                const merchant = merchantRepository.create(merchantData);
                await merchantRepository.save(merchant);
            }
            console.log('Sample merchants created');
        }

    } catch (error) {
        console.error('Database initialization failed:', error);
        throw error;
    }
} 