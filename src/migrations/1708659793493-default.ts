import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1708659793493 implements MigrationInterface {
    name = 'Default1708659793493'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "album" ("id" SERIAL NOT NULL, "nome" character varying NOT NULL, "banda" character varying NOT NULL, "capa" character varying NOT NULL, "nota" integer, CONSTRAINT "PK_58e0b4b8a31bb897e6959fe3206" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "album"`);
    }

}
