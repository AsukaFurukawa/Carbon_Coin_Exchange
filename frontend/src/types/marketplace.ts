export enum MerchantCategory {
    SUSTAINABLE_FASHION = 'SUSTAINABLE_FASHION',
    ECO_FRIENDLY_PRODUCTS = 'ECO_FRIENDLY_PRODUCTS',
    LOCAL_PRODUCE = 'LOCAL_PRODUCE',
    PUBLIC_TRANSPORT = 'PUBLIC_TRANSPORT',
    RENEWABLE_ENERGY = 'RENEWABLE_ENERGY'
}

export interface IMerchant {
    id: string;
    name: string;
    description: string;
    website: string;
    address: string;
    category: MerchantCategory;
    isVerified: boolean;
}

export interface IReward {
    id: string;
    merchantId: string;
    merchant: IMerchant;
    title: string;
    description: string;
    coinsCost: number;
    discountPercent: number;
    validUntil: Date;
    isActive: boolean;
    maxRedemptions: number;
    currentRedemptions: number;
}

export interface IRedemption {
    id: string;
    userId: string;
    rewardId: string;
    reward: IReward;
    redeemedAt: Date;
    coinsSpent: number;
    redemptionCode: string;
    isUsed: boolean;
} 