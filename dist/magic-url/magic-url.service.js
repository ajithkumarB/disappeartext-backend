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
exports.MagicUrlService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const magic_url_schema_1 = require("../schema/magic-url-schema");
var crypto = require('crypto');
let MagicUrlService = class MagicUrlService {
    constructor(magicUrlModel) {
        this.magicUrlModel = magicUrlModel;
    }
    async createMagicUrl(magicUrlDto, createdBy) {
        const { type, data, selfDestructTimer } = magicUrlDto;
        const newMagicUrl = new this.magicUrlModel();
        newMagicUrl.createdBy = createdBy;
        newMagicUrl.type = type;
        newMagicUrl.data = data;
        newMagicUrl.selfDestructTimer = selfDestructTimer;
        const uniqueId = crypto.randomBytes(10).toString('hex');
        newMagicUrl.uniqueId = uniqueId;
        var createdAt = new Date().getTime() / 1000;
        newMagicUrl.createdAt = createdAt;
        newMagicUrl.expiryTime = createdAt + selfDestructTimer;
        await newMagicUrl.save();
        return uniqueId;
    }
    async findMagicUrl(uniqueId) {
        const magicUrl = await this.magicUrlModel.findOne({ uniqueId });
        if (magicUrl) {
            const currentTime = new Date().getTime() / 1000;
            if (magicUrl.expiryTime > currentTime) {
                magicUrl.views++;
                await magicUrl.save();
                return [true, magicUrl.data, magicUrl.expiryTime];
            }
            return [false];
        }
        else
            return [false];
    }
    async getMyOldData(email) {
        const messages = await this.magicUrlModel.find({ createdBy: email });
        return messages;
    }
};
MagicUrlService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('MagicUrl')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], MagicUrlService);
exports.MagicUrlService = MagicUrlService;
//# sourceMappingURL=magic-url.service.js.map