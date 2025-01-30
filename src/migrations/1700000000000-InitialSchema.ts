import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1700000000000 implements MigrationInterface {
    name = 'InitialSchema1700000000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create enum types
        await queryRunner.query(`
            CREATE TYPE "activity_type_enum" AS ENUM (
                'WALKING', 'PUBLIC_TRANSPORT', 'ENERGY_SAVING', 'RECYCLING'
            )
        `);

        await queryRunner.query(`
            CREATE TYPE "measurement_unit_enum" AS ENUM (
                'STEPS', 'KILOMETERS', 'KWH', 'KILOGRAMS'
            )
        `);

        await queryRunner.query(`
            CREATE TYPE "verification_status_enum" AS ENUM (
                'PENDING', 'APPROVED', 'REJECTED'
            )
        `);

        await queryRunner.query(`
            CREATE TYPE "merchant_category_enum" AS ENUM (
                'SUSTAINABLE_FASHION', 'ECO_FRIENDLY_PRODUCTS', 'LOCAL_PRODUCE',
                'PUBLIC_TRANSPORT', 'RENEWABLE_ENERGY'
            )
        `);

        // Create Users table
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                "email" varchar NOT NULL UNIQUE,
                "password_hash" varchar NOT NULL,
                "name" varchar NOT NULL,
                "wallet_address" varchar NOT NULL,
                "carbon_coins" decimal(10,2) NOT NULL DEFAULT 0,
                "created_at" timestamp NOT NULL DEFAULT now()
            )
        `);

        // Create Activities table
        await queryRunner.query(`
            CREATE TABLE "activity" (
                "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                "user_id" uuid NOT NULL,
                "activity_type" activity_type_enum NOT NULL,
                "measurement" decimal NOT NULL,
                "unit" measurement_unit_enum NOT NULL,
                "verification_status" verification_status_enum NOT NULL DEFAULT 'PENDING',
                "proof_data" jsonb,
                "timestamp" timestamp NOT NULL DEFAULT now(),
                "verified_at" timestamp,
                "verified_by" varchar,
                FOREIGN KEY ("user_id") REFERENCES "user" ("id")
            )
        `);

        // Create Merchants table
        await queryRunner.query(`
            CREATE TABLE "merchant" (
                "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                "name" varchar NOT NULL,
                "description" text NOT NULL,
                "website" varchar NOT NULL,
                "address" varchar NOT NULL,
                "category" merchant_category_enum NOT NULL,
                "is_verified" boolean NOT NULL DEFAULT false
            )
        `);

        // Create Rewards table
        await queryRunner.query(`
            CREATE TABLE "reward" (
                "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                "merchant_id" uuid NOT NULL,
                "title" varchar NOT NULL,
                "description" text NOT NULL,
                "coins_cost" decimal NOT NULL,
                "discount_percent" decimal NOT NULL,
                "valid_until" timestamp NOT NULL,
                "is_active" boolean NOT NULL DEFAULT true,
                "max_redemptions" integer NOT NULL,
                "current_redemptions" integer NOT NULL DEFAULT 0,
                FOREIGN KEY ("merchant_id") REFERENCES "merchant" ("id")
            )
        `);

        // Create Redemptions table
        await queryRunner.query(`
            CREATE TABLE "redemption" (
                "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                "user_id" uuid NOT NULL,
                "reward_id" uuid NOT NULL,
                "redeemed_at" timestamp NOT NULL DEFAULT now(),
                "coins_spent" decimal NOT NULL,
                "redemption_code" varchar NOT NULL,
                "is_used" boolean NOT NULL DEFAULT false,
                FOREIGN KEY ("user_id") REFERENCES "user" ("id"),
                FOREIGN KEY ("reward_id") REFERENCES "reward" ("id")
            )
        `);

        // Create indexes
        await queryRunner.query(`
            CREATE INDEX "idx_activity_user_id" ON "activity" ("user_id");
            CREATE INDEX "idx_activity_verification_status" ON "activity" ("verification_status");
            CREATE INDEX "idx_reward_merchant_id" ON "reward" ("merchant_id");
            CREATE INDEX "idx_redemption_user_id" ON "redemption" ("user_id");
            CREATE INDEX "idx_redemption_reward_id" ON "redemption" ("reward_id");
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop tables
        await queryRunner.query(`DROP TABLE IF EXISTS "redemption"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "reward"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "merchant"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "activity"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "user"`);

        // Drop enum types
        await queryRunner.query(`DROP TYPE IF EXISTS "merchant_category_enum"`);
        await queryRunner.query(`DROP TYPE IF EXISTS "verification_status_enum"`);
        await queryRunner.query(`DROP TYPE IF EXISTS "measurement_unit_enum"`);
        await queryRunner.query(`DROP TYPE IF EXISTS "activity_type_enum"`);
    }
} 