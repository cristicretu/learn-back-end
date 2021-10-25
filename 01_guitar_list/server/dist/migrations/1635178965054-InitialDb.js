"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitialDb1635178965054 = void 0;
class InitialDb1635178965054 {
    constructor() {
        this.name = 'InitialDb1635178965054';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "public"."guitar" ADD "creatorId" integer NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "public"."guitar" DROP COLUMN "creatorId"`);
    }
}
exports.InitialDb1635178965054 = InitialDb1635178965054;
//# sourceMappingURL=1635178965054-InitialDb.js.map