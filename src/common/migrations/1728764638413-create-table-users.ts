import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1728764638413 implements MigrationInterface {
  name = 'Migration1728764638413';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."users_role_enum" AS ENUM('analyst', 'reviewer', 'approver')`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT 'analyst', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `INSERT INTO "users" (username, password, role) VALUES ('analyst@cooperfilme.com', 'analyst123', 'analyst')`,
    );
    await queryRunner.query(
      `INSERT INTO "users" (username, password, role) VALUES ('reviewer@cooperfilme.com', 'reviewer123', 'reviewer')`,
    );
    await queryRunner.query(
      `INSERT INTO "users" (username, password, role) VALUES ('approver@cooperfilme.com', 'approver123', 'approver')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
  }
}
