import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';

export class Migration1728848165697 implements MigrationInterface {
  name = 'Migration1728848165697';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."users_role_enum" AS ENUM('analyst', 'reviewer', 'approver')`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, "username" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT 'analyst', CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );

    const saltRounds = 10;
    const analystPassword = await bcrypt.hash('analyst123', saltRounds);
    const reviewerPassword = await bcrypt.hash('reviewer123', saltRounds);
    const approverPassword = await bcrypt.hash('approver123', saltRounds);

    await queryRunner.query(
      `INSERT INTO "users" (username, password, role) VALUES ('analyst@cooperfilme.com', '${analystPassword}', 'analyst')`,
    );
    await queryRunner.query(
      `INSERT INTO "users" (username, password, role) VALUES ('reviewer@cooperfilme.com', '${reviewerPassword}', 'reviewer')`,
    );
    await queryRunner.query(
      `INSERT INTO "users" (username, password, role) VALUES ('approver@cooperfilme.com', '${approverPassword}', 'approver')`,
    );

    await queryRunner.query(
      `CREATE TYPE "public"."script_state_state_enum" AS ENUM('awaiting_analysis', 'in_analysis', 'awaiting_review', 'in_review', 'awaiting_approval', 'in_approval', 'approved', 'rejected', 'error')`,
    );
    await queryRunner.query(
      `CREATE TABLE "script_state" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, "state" "public"."script_state_state_enum" NOT NULL DEFAULT 'awaiting_analysis', "script_id" uuid, CONSTRAINT "PK_4409018a87c49b73ca4a3549025" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."script_status_enum" AS ENUM('awaiting_analysis', 'in_analysis', 'awaiting_review', 'in_review', 'awaiting_approval', 'in_approval', 'approved', 'rejected', 'error')`,
    );
    await queryRunner.query(
      `CREATE TABLE "script" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, "email" character varying NOT NULL, "title" character varying NOT NULL, "genre" character varying NOT NULL, "author" character varying NOT NULL, "content" text NOT NULL, "status" "public"."script_status_enum" NOT NULL DEFAULT 'awaiting_analysis', CONSTRAINT "PK_90683f80965555e177a0e7346af" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "script_state" ADD CONSTRAINT "FK_3b1d2960a63014a21310b59ac98" FOREIGN KEY ("script_id") REFERENCES "script"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "script_state" DROP CONSTRAINT "FK_3b1d2960a63014a21310b59ac98"`,
    );
    await queryRunner.query(`DROP TABLE "script"`);
    await queryRunner.query(`DROP TYPE "public"."script_status_enum"`);
    await queryRunner.query(`DROP TABLE "script_state"`);
    await queryRunner.query(`DROP TYPE "public"."script_state_state_enum"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
  }
}
