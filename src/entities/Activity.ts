import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from './User';
import { ActivityType, MeasurementUnit } from '../types/activity';
import { VerificationStatus } from '../types/verification';

@Entity()
export class Activity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, user => user.activities)
    user: User;

    @Column()
    userId: string;

    @Column({
        type: 'enum',
        enum: ActivityType
    })
    activityType: ActivityType;

    @Column('decimal')
    measurement: number;

    @Column({
        type: 'enum',
        enum: MeasurementUnit
    })
    unit: MeasurementUnit;

    @Column({
        type: 'enum',
        enum: VerificationStatus,
        default: VerificationStatus.PENDING
    })
    verificationStatus: VerificationStatus;

    @Column({ type: 'json', nullable: true })
    proofData: string;

    @CreateDateColumn()
    timestamp: Date;

    @Column({ nullable: true })
    verifiedAt: Date;

    @Column({ nullable: true })
    verifiedBy: string;
} 