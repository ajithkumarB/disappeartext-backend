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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const email_dto_1 = require("./dto/email.dto");
const userLoginCredentials_dto_1 = require("./dto/userLoginCredentials.dto");
const jwt_refresh_guard_1 = require("./jwt-refresh-guard");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async signIn(userLoginCredentialsDto, res) {
        const response = await this.authService.signIn(userLoginCredentialsDto);
        return res.status(common_1.HttpStatus.OK).json({
            message: response[0],
            accessToken: response[1],
            refreshToken: response[2]
        });
    }
    async forgotPassword(emailDto, res) {
        const response = await this.authService.forgotPassword(emailDto);
        return res.status(common_1.HttpStatus.OK).json({
            message: response
        });
    }
    async validateResetPasswordToken(req, res) {
        const status = await this.authService.validateResetPasswordToken(req.params.token);
        if (status)
            res.render('resetPassword', { token: req.params.token });
        else
            res.render('resetPasswordFailure');
    }
    async resetPassword(req, res) {
        const response = await this.authService.resetPassword(req.params.token, req.body);
        if (response)
            res.render('resetPasswordSuccess');
        else
            res.render('resetPasswordFailure');
    }
    renewAccessToken(req) {
        return this.authService.renewAccessToken(req.user);
    }
};
__decorate([
    common_1.Post('signin'),
    __param(0, common_1.Body(common_1.ValidationPipe)), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [userLoginCredentials_dto_1.UserLoginCredentialsDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signIn", null);
__decorate([
    common_1.Post('forgot_password'),
    __param(0, common_1.Body(common_1.ValidationPipe)), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [email_dto_1.EmailDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgotPassword", null);
__decorate([
    common_1.Get('verify/resetpassword/:token'),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "validateResetPasswordToken", null);
__decorate([
    common_1.Post('reset/password/:token'),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
__decorate([
    common_1.Get('/renewAccessToken'),
    common_1.UseGuards(jwt_refresh_guard_1.default),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "renewAccessToken", null);
AuthController = __decorate([
    common_1.Controller('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map