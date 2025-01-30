import { ActivityService } from '../../services/ActivityService';
import { AppDataSource } from '../../config/database';
import { Activity } from '../../entities/Activity';
import { User } from '../../entities/User';
import { ActivityType, MeasurementUnit } from '../../types/activity';

describe('ActivityService', () => {
    let activityService: ActivityService;
    let testUser: User;

    beforeEach(async () => {
        // Clear activities table before each test
        await AppDataSource.getRepository(Activity).clear();
        await AppDataSource.getRepository(User).clear();

        activityService = new ActivityService();

        // Create test user
        const userRepo = AppDataSource.getRepository(User);
        testUser = await userRepo.save(userRepo.create({
            email: 'test@example.com',
            passwordHash: 'hash',
            name: 'Test User',
            walletAddress: 'wallet123'
        }));
    });

    describe('submitActivity', () => {
        it('should successfully submit a valid activity', async () => {
            const activityData = {
                userId: testUser.id,
                activityType: ActivityType.WALKING,
                measurement: 10000,
                unit: MeasurementUnit.STEPS
            };

            const activity = await activityService.submitActivity(activityData);

            expect(activity).toBeDefined();
            expect(activity.userId).toBe(testUser.id);
            expect(activity.activityType).toBe(ActivityType.WALKING);
            expect(activity.measurement).toBe(10000);
            expect(activity.unit).toBe(MeasurementUnit.STEPS);
            expect(activity.verificationStatus).toBe('PENDING');
        });

        it('should throw error for invalid measurement unit', async () => {
            const activityData = {
                userId: testUser.id,
                activityType: ActivityType.WALKING,
                measurement: 10000,
                unit: MeasurementUnit.KWH // Invalid unit for walking
            };

            await expect(activityService.submitActivity(activityData))
                .rejects.toThrow('Invalid unit');
        });
    });
}); 