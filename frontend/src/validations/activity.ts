import { z } from 'zod';
import { ActivityType, MeasurementUnit } from '../types/activity';

const measurementValidation = {
    [ActivityType.WALKING]: {
        units: [MeasurementUnit.STEPS],
        min: 100,
        max: 100000,
    },
    [ActivityType.PUBLIC_TRANSPORT]: {
        units: [MeasurementUnit.KILOMETERS],
        min: 0.1,
        max: 1000,
    },
    [ActivityType.ENERGY_SAVING]: {
        units: [MeasurementUnit.KWH],
        min: 0.1,
        max: 1000,
    },
    [ActivityType.RECYCLING]: {
        units: [MeasurementUnit.KILOGRAMS],
        min: 0.1,
        max: 1000,
    },
};

export const activitySchema = z.object({
    activityType: z.nativeEnum(ActivityType),
    measurement: z.number().positive('Measurement must be positive'),
    unit: z.nativeEnum(MeasurementUnit),
}).refine(
    (data) => {
        const validation = measurementValidation[data.activityType];
        return validation.units.includes(data.unit);
    },
    {
        message: 'Invalid unit for this activity type',
        path: ['unit'],
    }
).refine(
    (data) => {
        const validation = measurementValidation[data.activityType];
        return data.measurement >= validation.min && data.measurement <= validation.max;
    },
    {
        message: 'Measurement out of valid range',
        path: ['measurement'],
    }
);

export type ActivityInput = z.infer<typeof activitySchema>; 