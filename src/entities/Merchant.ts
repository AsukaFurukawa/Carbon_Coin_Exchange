import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { MerchantCategory } from '../types/marketplace';
import { Reward } from './Reward';

@Entity()
export class Merchant {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    website: string;

    @Column()
    address: string;

    @Column({
        type: 'enum',
        enum: MerchantCategory
    })
    category: MerchantCategory;

    @Column({ default: false })
    isVerified: boolean;

    @OneToMany(() => Reward, reward => reward.merchant)
    rewards: Reward[];
} 