import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Activity } from './Activity';
import { Redemption } from './Redemption';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    email: string;

    @Column()
    passwordHash: string;

    @Column()
    name: string;

    @Column()
    walletAddress: string;

    @Column('decimal', { precision: 10, scale: 2, default: 0 })
    carbonCoins: number;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => Activity, activity => activity.user)
    activities: Activity[];

    @OneToMany(() => Redemption, redemption => redemption.user)
    redemptions: Redemption[];
} 