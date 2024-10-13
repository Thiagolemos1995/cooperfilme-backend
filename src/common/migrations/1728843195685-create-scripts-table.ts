import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1728843195685 implements MigrationInterface {
    name = 'Migration1728843195685'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."script_state_state_enum" AS ENUM('awaiting_analysis', 'in_analysis', 'awaiting_review', 'in_review', 'awaiting_approval', 'in_approval', 'approved', 'rejected', 'error')`);
        await queryRunner.query(`CREATE TABLE "script_state" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, "state" "public"."script_state_state_enum" NOT NULL DEFAULT 'awaiting_analysis', "script_id" uuid, CONSTRAINT "PK_4409018a87c49b73ca4a3549025" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."script_status_enum" AS ENUM('awaiting_analysis', 'in_analysis', 'awaiting_review', 'in_review', 'awaiting_approval', 'in_approval', 'approved', 'rejected', 'error')`);
        await queryRunner.query(`CREATE TABLE "script" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, "title" character varying NOT NULL, "genre" character varying NOT NULL, "author" character varying NOT NULL, "content" text NOT NULL, "status" "public"."script_status_enum" NOT NULL DEFAULT 'awaiting_analysis', CONSTRAINT "PK_90683f80965555e177a0e7346af" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "script_state" ADD CONSTRAINT "FK_3b1d2960a63014a21310b59ac98" FOREIGN KEY ("script_id") REFERENCES "script"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "script_state" DROP CONSTRAINT "FK_3b1d2960a63014a21310b59ac98"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")`);
        await queryRunner.query(`DROP TABLE "script"`);
        await queryRunner.query(`DROP TYPE "public"."script_status_enum"`);
        await queryRunner.query(`DROP TABLE "script_state"`);
        await queryRunner.query(`DROP TYPE "public"."script_state_state_enum"`);
    }

}
