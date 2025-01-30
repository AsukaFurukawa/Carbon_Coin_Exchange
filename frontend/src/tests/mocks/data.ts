import { IUser } from '../../types/auth';
import { IActivity, ActivityType, MeasurementUnit, VerificationStatus } from '../../types/activity';
import { IIntegration, IntegrationType, FitnessProvider } from '../../types/integrations';

export const mockUser: IUser = {
    id: '1',
    email: 'test@example.com',
    name: 'Test User',
    walletAddress: '0x123...abc',
    carbonCoins: 100,
};

export const mockActivities: IActivity[] = [
    {
        id: '1',
        userId: '1',
        activityType: ActivityType.WALKING,
        measurement: 10000,
        unit: MeasurementUnit.STEPS,
        timestamp: new Date('2023-01-01'),
        verificationStatus: VerificationStatus.APPROVED,
    },
    {
        id: '2',
        userId: '1',
        activityType: ActivityType.ENERGY_SAVING,
        measurement: 5.5,
        unit: MeasurementUnit.KWH,
        timestamp: new Date('2023-01-02'),
        verificationStatus: VerificationStatus.PENDING,
    },
];

export const mockIntegrations: IIntegration[] = [
    {
        id: '1',
        userId: '1',
        type: IntegrationType.FITNESS_TRACKER,
        provider: FitnessProvider.FITBIT,
        isConnected: true,
        lastSynced: new Date('2023-01-01'),
    },
]; 