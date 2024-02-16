import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1708065888969 implements MigrationInterface {
    name = 'Default1708065888969'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "album" DROP COLUMN "art"`);
        await queryRunner.query(`ALTER TABLE "album" ADD "capa" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "album" ALTER COLUMN "nota" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "album" ALTER COLUMN "nota" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "album" DROP COLUMN "capa"`);
        await queryRunner.query(`ALTER TABLE "album" ADD "art" character varying NOT NULL`);
    }

}
