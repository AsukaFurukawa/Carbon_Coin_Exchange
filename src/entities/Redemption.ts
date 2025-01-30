import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from './User';
import { Reward } from './Reward';

@Entity()
export class Redemption {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, user => user.redemptions)
    user: User;

    @Column()
    userId: string;

    @ManyToOne(() => Reward, reward => reward.redemptions)
    reward: Reward;

    @Column()
    rewardId: string;

    @CreateDateColumn()
    redeemedAt: Date;

    @Column('decimal')
    coinsSpent: number;

    @Column()
    redemptionCode: string;

    @Column({ default: false })
    isUsed: boolean;
} 