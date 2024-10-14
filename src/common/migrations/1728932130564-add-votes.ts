import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1728932130564 implements MigrationInterface {
    name = 'Migration1728932130564'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "script" ADD "votes" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "script" DROP COLUMN "votes"`);
    }

}
