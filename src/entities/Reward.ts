import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Merchant } from './Merchant';
import { Redemption } from './Redemption';

@Entity()
export class Reward {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Merchant, merchant => merchant.rewards)
    merchant: Merchant;

    @Column()
    merchantId: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column('decimal')
    coinsCost: number;

    @Column('decimal')
    discountPercent: number;

    @Column()
    validUntil: Date;

    @Column({ default: true })
    isActive: boolean;

    @Column()
    maxRedemptions: number;

    @Column({ default: 0 })
    currentRedemptions: number;

    @OneToMany(() => Redemption, redemption => redemption.reward)
    redemptions: Redemption[];
} 