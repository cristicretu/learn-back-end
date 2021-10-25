import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialDb1635178965054 implements MigrationInterface {
    name = 'InitialDb1635178965054'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."guitar" ADD "creatorId" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."guitar" DROP COLUMN "creatorId"`);
    }

}
