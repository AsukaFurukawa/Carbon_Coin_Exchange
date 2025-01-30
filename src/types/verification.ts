export enum VerificationStatus {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED'
}

export enum VerificationMethod {
    AUTOMATIC = 'AUTOMATIC',
    MANUAL = 'MANUAL',
    API_INTEGRATION = 'API_INTEGRATION'
}

export interface IVerificationResult {
    status: VerificationStatus;
    method: VerificationMethod;
    verifiedAt: number;
    verifiedBy?: string; // userId of manual verifier or system ID
    notes?: string;
    confidence: number; // 0-1 score for automatic verification
}

export interface IVerificationRule {
    activityType: string;
    method: VerificationMethod;
    requiredProofTypes: string[];
    automaticChecks?: Array<(activity: any) => Promise<boolean>>;
    apiEndpoint?: string;
    minimumConfidence: number;
} 