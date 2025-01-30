export enum IntegrationType {
    FITNESS_TRACKER = 'FITNESS_TRACKER',
    UTILITY_PROVIDER = 'UTILITY_PROVIDER',
    TRANSPORT_APP = 'TRANSPORT_APP',
}

export enum FitnessProvider {
    GOOGLE_FIT = 'GOOGLE_FIT',
    FITBIT = 'FITBIT',
    APPLE_HEALTH = 'APPLE_HEALTH',
    STRAVA = 'STRAVA',
}

export enum UtilityProvider {
    SMART_METER = 'SMART_METER',
    SOLAR_PANELS = 'SOLAR_PANELS',
    ELECTRIC_VEHICLE = 'ELECTRIC_VEHICLE',
}

export interface IIntegration {
    id: string;
    userId: string;
    type: IntegrationType;
    provider: FitnessProvider | UtilityProvider;
    isConnected: boolean;
    lastSynced?: Date;
    metadata?: Record<string, any>;
}

export interface IIntegrationData {
    steps?: number;
    distance?: number;
    energyUsage?: number;
    energyGenerated?: number;
    transportMode?: string;
    timestamp: Date;
} 