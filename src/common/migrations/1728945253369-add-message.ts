import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1728945253369 implements MigrationInterface {
    name = 'Migration1728945253369'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "script" ADD "message" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "script" DROP COLUMN "message"`);
    }

}
