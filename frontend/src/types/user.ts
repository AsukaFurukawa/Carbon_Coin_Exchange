export interface IUserProfile {
    id: string;
    email: string;
    name: string;
    walletAddress: string;
    notificationPreferences: {
        email: boolean;
        push: boolean;
        activityReminders: boolean;
        marketplaceUpdates: boolean;
    };
    privacySettings: {
        showActivityHistory: boolean;
        showRewards: boolean;
        publicProfile: boolean;
    };
    theme: 'light' | 'dark' | 'system';
    language: string;
}

export interface IProfileUpdateInput {
    name?: string;
    email?: string;
    currentPassword?: string;
    newPassword?: string;
    notificationPreferences?: Partial<IUserProfile['notificationPreferences']>;
    privacySettings?: Partial<IUserProfile['privacySettings']>;
    theme?: IUserProfile['theme'];
    language?: string;
} 