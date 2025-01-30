import { AppDataSource } from '../config/database';

async function runMigrations() {
    try {
        await AppDataSource.initialize();
        await AppDataSource.runMigrations();
        console.log('Migrations completed successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error running migrations:', error);
        process.exit(1);
    }
}

runMigrations(); 