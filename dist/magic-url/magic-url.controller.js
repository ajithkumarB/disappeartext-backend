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
exports.MagicUrlController = void 0;
const common_1 = require("@nestjs/common");
const magic_url_service_1 = require("./magic-url.service");
const magicUrl_dto_1 = require("./dto/magicUrl.dto");
const jwt_access_guard_1 = require("../auth/jwt-access-guard");
let MagicUrlController = class MagicUrlController {
    constructor(magicUrlService) {
        this.magicUrlService = magicUrlService;
    }
    async createMagicUrl(req, magicUrlDto, res) {
        const response = await this.magicUrlService.createMagicUrl(magicUrlDto, req.user);
        if (magicUrlDto.type == 'message') {
            return res.status(common_1.HttpStatus.OK).json({
                message: 'Magic Url Created SuccessFully',
                Url: process.env.BASE_URL + '/magic-url/msg/' + response
            });
        }
        else {
            return res.status(common_1.HttpStatus.OK).json({
                message: 'Magic Url Created SuccessFully',
                Url: process.env.BASE_URL + '/magic-url/' + response
            });
        }
    }
    async findMagicUrlMessage(req, res) {
        const response = await this.magicUrlService.findMagicUrl(req.params.uniqueId);
        if (response[0]) {
            return res.render('message', { message: response[1], expiry: response[2] });
        }
        else {
            return res.render('messageTimeout');
        }
    }
    async findMagicUrlLink(req, res) {
        const response = await this.magicUrlService.findMagicUrl(req.params.uniqueId);
        if (response[0]) {
            return res.redirect(response[1]);
        }
        else {
            return res.render('messageTimeout');
        }
    }
    async getMyOldData(req, res) {
        const response = await this.magicUrlService.getMyOldData(req.user);
        return res.status(common_1.HttpStatus.OK).json({
            message: 'Old data of current User',
            data: response
        });
    }
};
__decorate([
    common_1.Post(),
    common_1.UseGuards(jwt_access_guard_1.default),
    __param(0, common_1.Req()), __param(1, common_1.Body(common_1.ValidationPipe)), __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, magicUrl_dto_1.MagicUrlDto, Object]),
    __metadata("design:returntype", Promise)
], MagicUrlController.prototype, "createMagicUrl", null);
__decorate([
    common_1.Get('msg/:uniqueId'),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MagicUrlController.prototype, "findMagicUrlMessage", null);
__decorate([
    common_1.Get('/:uniqueId'),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MagicUrlController.prototype, "findMagicUrlLink", null);
__decorate([
    common_1.Get(),
    common_1.UseGuards(jwt_access_guard_1.default),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MagicUrlController.prototype, "getMyOldData", null);
MagicUrlController = __decorate([
    common_1.Controller('magic-url'),
    __metadata("design:paramtypes", [magic_url_service_1.MagicUrlService])
], MagicUrlController);
exports.MagicUrlController = MagicUrlController;
//# sourceMappingURL=magic-url.controller.js.map