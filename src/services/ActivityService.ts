import { v4 as uuidv4 } from 'uuid';
import { AppDataSource } from '../config/database';
import { Activity } from '../entities/Activity';
import { User } from '../entities/User';
import { IActivitySubmission, ActivityType, MeasurementUnit } from '../types/activity';
import { VerificationStatus } from '../types/verification';

export class ActivityService {
    private activityRepository = AppDataSource.getRepository(Activity);
    private userRepository = AppDataSource.getRepository(User);

    async submitActivity(submission: IActivitySubmission): Promise<Activity> {
        // Validate submission
        this.validateSubmission(submission);

        // Get user
        const user = await this.userRepository.findOneBy({ id: submission.userId });
        if (!user) {
            throw new Error('User not found');
        }

        // Create activity
        const activity = this.activityRepository.create({
            user,
            userId: user.id,
            activityType: submission.activityType,
            measurement: submission.measurement,
            unit: submission.unit,
            proofData: submission.proofData,
            verificationStatus: VerificationStatus.PENDING
        });

        return this.activityRepository.save(activity);
    }

    async getActivityById(activityId: string): Promise<Activity | null> {
        return this.activityRepository.findOne({
            where: { id: activityId },
            relations: ['user']
        });
    }

    async getActivitiesByUser(userId: string): Promise<Activity[]> {
        return this.activityRepository.find({
            where: { userId },
            order: { timestamp: 'DESC' }
        });
    }

    async updateActivityVerification(
        activityId: string,
        status: VerificationStatus,
        verifiedBy: string
    ): Promise<Activity> {
        const activity = await this.getActivityById(activityId);
        if (!activity) {
            throw new Error('Activity not found');
        }

        activity.verificationStatus = status;
        activity.verifiedAt = new Date();
        activity.verifiedBy = verifiedBy;

        return this.activityRepository.save(activity);
    }

    private validateSubmission(submission: IActivitySubmission): void {
        // Validate measurement is positive
        if (submission.measurement <= 0) {
            throw new Error('Measurement must be positive');
        }

        // Validate unit matches activity type
        this.validateUnitForActivityType(submission.activityType, submission.unit);
    }

    private validateUnitForActivityType(activityType: ActivityType, unit: MeasurementUnit): void {
        const validUnits: Record<ActivityType, MeasurementUnit[]> = {
            [ActivityType.WALKING]: [MeasurementUnit.STEPS, MeasurementUnit.KILOMETERS],
            [ActivityType.PUBLIC_TRANSPORT]: [MeasurementUnit.KILOMETERS],
            [ActivityType.ENERGY_SAVING]: [MeasurementUnit.KWH],
            [ActivityType.RECYCLING]: [MeasurementUnit.KILOGRAMS]
        };

        if (!validUnits[activityType].includes(unit)) {
            throw new Error(`Invalid unit ${unit} for activity type ${activityType}`);
        }
    }
} 