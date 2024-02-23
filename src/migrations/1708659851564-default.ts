import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1708659851564 implements MigrationInterface {
    name = 'Default1708659851564'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "album" ADD "link" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "album" DROP COLUMN "link"`);
    }

}
