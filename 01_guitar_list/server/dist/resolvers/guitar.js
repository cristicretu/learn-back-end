"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuitarResolver = void 0;
const Guitar_1 = require("../entities/Guitar");
const isAuth_1 = require("../middleware/isAuth");
const type_graphql_1 = require("type-graphql");
let GuitarInput = class GuitarInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], GuitarInput.prototype, "year", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], GuitarInput.prototype, "brand", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], GuitarInput.prototype, "model", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], GuitarInput.prototype, "color", void 0);
GuitarInput = __decorate([
    (0, type_graphql_1.InputType)()
], GuitarInput);
let GuitarResolver = class GuitarResolver {
    guitar(id) {
        return Guitar_1.Guitar.findOne(id);
    }
    async createGuitar(input, { req }) {
        return Guitar_1.Guitar.create(Object.assign(Object.assign({}, input), { creatorId: req.session.userId })).save();
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => Guitar_1.Guitar, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], GuitarResolver.prototype, "guitar", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Guitar_1.Guitar),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    __param(0, (0, type_graphql_1.Arg)("input")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GuitarInput, Object]),
    __metadata("design:returntype", Promise)
], GuitarResolver.prototype, "createGuitar", null);
GuitarResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], GuitarResolver);
exports.GuitarResolver = GuitarResolver;
//# sourceMappingURL=guitar.js.map