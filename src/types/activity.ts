export enum ActivityType {
    WALKING = 'WALKING',
    PUBLIC_TRANSPORT = 'PUBLIC_TRANSPORT',
    ENERGY_SAVING = 'ENERGY_SAVING',
    RECYCLING = 'RECYCLING'
}

export enum MeasurementUnit {
    STEPS = 'STEPS',
    KILOMETERS = 'KILOMETERS',
    KWH = 'KWH',
    KILOGRAMS = 'KILOGRAMS'
}

export interface ISustainableActivity {
    id: string;
    userId: string;
    activityType: ActivityType;
    measurement: number;
    unit: MeasurementUnit;
    timestamp: number;
    verified: boolean;
    proofData?: string; // Could be a hash of uploaded evidence
}

export interface IActivitySubmission {
    userId: string;
    activityType: ActivityType;
    measurement: number;
    unit: MeasurementUnit;
    proofData?: string;
} 