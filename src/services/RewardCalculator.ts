import { ActivityType, MeasurementUnit, ISustainableActivity } from '../types/activity';

export class RewardCalculator {
    private readonly rewardRates: Record<ActivityType, Record<MeasurementUnit, number>> = {
        [ActivityType.WALKING]: {
            [MeasurementUnit.STEPS]: 0.0001, // 1 coin per 10000 steps
            [MeasurementUnit.KILOMETERS]: 0.1 // 0.1 coin per kilometer
        },
        [ActivityType.PUBLIC_TRANSPORT]: {
            [MeasurementUnit.KILOMETERS]: 0.05 // 0.05 coin per kilometer
        },
        [ActivityType.ENERGY_SAVING]: {
            [MeasurementUnit.KWH]: 0.2 // 0.2 coin per KWH saved
        },
        [ActivityType.RECYCLING]: {
            [MeasurementUnit.KILOGRAMS]: 0.5 // 0.5 coin per KG recycled
        }
    };

    calculateReward(activity: ISustainableActivity): number {
        if (!activity.verified) {
            return 0;
        }

        const rate = this.rewardRates[activity.activityType][activity.unit];
        return activity.measurement * rate;
    }
} 