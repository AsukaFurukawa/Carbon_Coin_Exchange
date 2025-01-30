export interface IReward {
    id: string;
    merchantId: string;
    title: string;
    description: string;
    coinsCost: number;
    discountPercent: number;
    validUntil: number;
    isActive: boolean;
    maxRedemptions: number;
    currentRedemptions: number;
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

export interface IRedemption {
    id: string;
    userId: string;
    rewardId: string;
    merchantId: string;
    redeemedAt: number;
    coinsSpent: number;
    redemptionCode: string;
    isUsed: boolean;
}

export enum MerchantCategory {
    SUSTAINABLE_FASHION = 'SUSTAINABLE_FASHION',
    ECO_FRIENDLY_PRODUCTS = 'ECO_FRIENDLY_PRODUCTS',
    LOCAL_PRODUCE = 'LOCAL_PRODUCE',
    PUBLIC_TRANSPORT = 'PUBLIC_TRANSPORT',
    RENEWABLE_ENERGY = 'RENEWABLE_ENERGY'
} 