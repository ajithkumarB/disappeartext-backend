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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MagicUrlSchema = exports.MagicUrl = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let MagicUrl = class MagicUrl {
};
__decorate([
    mongoose_1.Prop({ required: true, enum: ['message', 'link'] }),
    __metadata("design:type", String)
], MagicUrl.prototype, "type", void 0);
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", String)
], MagicUrl.prototype, "data", void 0);
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", Number)
], MagicUrl.prototype, "selfDestructTimer", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", Number)
], MagicUrl.prototype, "createdAt", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", Number)
], MagicUrl.prototype, "expiryTime", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], MagicUrl.prototype, "uniqueId", void 0);
__decorate([
    mongoose_1.Prop({ default: 0 }),
    __metadata("design:type", Number)
], MagicUrl.prototype, "views", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], MagicUrl.prototype, "createdBy", void 0);
MagicUrl = __decorate([
    mongoose_1.Schema()
], MagicUrl);
exports.MagicUrl = MagicUrl;
exports.MagicUrlSchema = mongoose_1.SchemaFactory.createForClass(MagicUrl);
//# sourceMappingURL=magic-url-schema.js.map