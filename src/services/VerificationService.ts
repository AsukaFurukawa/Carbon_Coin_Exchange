import { 
    VerificationStatus, 
    VerificationMethod, 
    IVerificationResult, 
    IVerificationRule 
} from '../types/verification';
import { ISustainableActivity, ActivityType } from '../types/activity';
import { TokenService } from './TokenService';
import { AuthService } from './AuthService';

export class VerificationService {
    private verificationRules: Map<ActivityType, IVerificationRule> = new Map();

    constructor(
        private tokenService: TokenService,
        private authService: AuthService
    ) {
        this.initializeVerificationRules();
    }

    private initializeVerificationRules() {
        // Walking activity verification
        this.verificationRules.set(ActivityType.WALKING, {
            activityType: ActivityType.WALKING,
            method: VerificationMethod.API_INTEGRATION,
            requiredProofTypes: ['stepCount', 'timestamp'],
            apiEndpoint: process.env.FITNESS_API_ENDPOINT,
            minimumConfidence: 0.8
        });

        // Public transport verification
        this.verificationRules.set(ActivityType.PUBLIC_TRANSPORT, {
            activityType: ActivityType.PUBLIC_TRANSPORT,
            method: VerificationMethod.AUTOMATIC,
            requiredProofTypes: ['ticket', 'timestamp', 'route'],
            minimumConfidence: 0.9
        });

        // Energy saving verification
        this.verificationRules.set(ActivityType.ENERGY_SAVING, {
            activityType: ActivityType.ENERGY_SAVING,
            method: VerificationMethod.API_INTEGRATION,
            requiredProofTypes: ['utilityBill', 'timestamp'],
            apiEndpoint: process.env.UTILITY_API_ENDPOINT,
            minimumConfidence: 0.95
        });
    }

    async verifyActivity(activity: ISustainableActivity): Promise<IVerificationResult> {
        const rule = this.verificationRules.get(activity.activityType);
        if (!rule) {
            throw new Error(`No verification rule found for activity type: ${activity.activityType}`);
        }

        let verificationResult: IVerificationResult;

        switch (rule.method) {
            case VerificationMethod.AUTOMATIC:
                verificationResult = await this.performAutomaticVerification(activity, rule);
                break;
            case VerificationMethod.API_INTEGRATION:
                verificationResult = await this.performApiVerification(activity, rule);
                break;
            case VerificationMethod.MANUAL:
                verificationResult = await this.queueForManualVerification(activity);
                break;
            default:
                throw new Error(`Unsupported verification method: ${rule.method}`);
        }

        // If verification is approved, trigger token award
        if (verificationResult.status === VerificationStatus.APPROVED) {
            const user = await this.authService.getUserById(activity.userId);
            if (user) {
                await this.tokenService.awardTokens(activity, user);
            }
        }

        return verificationResult;
    }

    private async performAutomaticVerification(
        activity: ISustainableActivity,
        rule: IVerificationRule
    ): Promise<IVerificationResult> {
        // Check if all required proof types are present
        const proofData = JSON.parse(activity.proofData || '{}');
        const hasAllRequiredProofs = rule.requiredProofTypes.every(
            proofType => proofData[proofType]
        );

        if (!hasAllRequiredProofs) {
            return {
                status: VerificationStatus.REJECTED,
                method: VerificationMethod.AUTOMATIC,
                verifiedAt: Date.now(),
                confidence: 0,
                notes: 'Missing required proof data'
            };
        }

        // Perform automatic checks if defined
        if (rule.automaticChecks) {
            const checkResults = await Promise.all(rule.automaticChecks.map(check => check(activity)));
            const confidence = checkResults.filter(Boolean).length / checkResults.length;

            return {
                status: confidence >= rule.minimumConfidence 
                    ? VerificationStatus.APPROVED 
                    : VerificationStatus.REJECTED,
                method: VerificationMethod.AUTOMATIC,
                verifiedAt: Date.now(),
                confidence,
                notes: confidence >= rule.minimumConfidence 
                    ? 'Automatically verified'
                    : 'Failed automatic verification checks'
            };
        }

        return {
            status: VerificationStatus.PENDING,
            method: VerificationMethod.AUTOMATIC,
            verifiedAt: Date.now(),
            confidence: 0,
            notes: 'No automatic checks defined'
        };
    }

    private async performApiVerification(
        activity: ISustainableActivity,
        rule: IVerificationRule
    ): Promise<IVerificationResult> {
        if (!rule.apiEndpoint) {
            throw new Error('API endpoint not configured for verification');
        }

        try {
            // Make API call to verify activity
            const response = await fetch(rule.apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(activity)
            });

            const result = await response.json();

            return {
                status: result.verified ? VerificationStatus.APPROVED : VerificationStatus.REJECTED,
                method: VerificationMethod.API_INTEGRATION,
                verifiedAt: Date.now(),
                confidence: result.confidence || 0,
                notes: result.notes
            };
        } catch (error) {
            console.error('API verification failed:', error);
            return {
                status: VerificationStatus.REJECTED,
                method: VerificationMethod.API_INTEGRATION,
                verifiedAt: Date.now(),
                confidence: 0,
                notes: 'API verification failed'
            };
        }
    }

    private async queueForManualVerification(
        activity: ISustainableActivity
    ): Promise<IVerificationResult> {
        // In a real implementation, this would queue the activity for manual review
        return {
            status: VerificationStatus.PENDING,
            method: VerificationMethod.MANUAL,
            verifiedAt: Date.now(),
            confidence: 0,
            notes: 'Queued for manual verification'
        };
    }
} 