"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitialDb1635083837982 = void 0;
class InitialDb1635083837982 {
    constructor() {
        this.name = 'InitialDb1635083837982';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "guitar" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "year" integer NOT NULL, "brand" character varying NOT NULL, "model" character varying NOT NULL, "color" character varying NOT NULL, CONSTRAINT "PK_cda66a01dabadeebb230ca2d457" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "guitar"`);
    }
}
exports.InitialDb1635083837982 = InitialDb1635083837982;
//# sourceMappingURL=1635083837982-InitialDb.js.map