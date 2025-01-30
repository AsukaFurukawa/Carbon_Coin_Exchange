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

export enum VerificationStatus {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED'
}

export interface IActivity {
    id: string;
    userId: string;
    activityType: ActivityType;
    measurement: number;
    unit: MeasurementUnit;
    timestamp: Date;
    verificationStatus: VerificationStatus;
    verifiedAt?: Date;
    verifiedBy?: string;
    proofData?: string;
}

export interface IActivityStats {
    totalActivities: number;
    totalCoinsEarned: number;
    activitiesByType: Record<ActivityType, number>;
    verificationStats: {
        pending: number;
        approved: number;
        rejected: number;
    };
} 