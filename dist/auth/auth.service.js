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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../schema/user.schema");
const bcrypt = require("bcrypt");
const resetPasswordMail_1 = require("../views/resetPasswordMail");
const Handlebars = require('handlebars');
const sendMail_1 = require("../utils/sendMail");
let AuthService = class AuthService {
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
    }
    async signIn(userLoginCredentialsDto) {
        const user = await this.validateUserPassword(userLoginCredentialsDto);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid Credentials');
        }
        const email = user.email;
        const payload = { email };
        const accessToken = await this.jwtService.sign(payload, {
            secret: process.env.ACCESS_TOKEN_SECRET,
            expiresIn: '15m',
        });
        const refreshToken = await this.jwtService.sign(payload, {
            secret: process.env.REFRESH_TOKEN_SECRET,
            expiresIn: '24h',
        });
        return ['Access Granted', accessToken, refreshToken];
    }
    async validateUserPassword(userLoginCredentialsDto) {
        const { username, password } = userLoginCredentialsDto;
        const user = await this.userModel.findOne({ username });
        if (user) {
            const hash = await bcrypt.hash(password, user.salt);
            if (hash === user.password) {
                return user;
            }
            else {
                return null;
            }
        }
        else {
            return null;
        }
    }
    async forgotPassword(emailDto) {
        const { email } = emailDto;
        const user = await this.userModel.findOne({ email: email });
        if (!user) {
            return 'User with the given email doesn\'t exist';
        }
        const payload = { email };
        const forgotPasswordToken = await this.jwtService.sign(payload, {
            secret: process.env.FORGOT_PASSWORD_TOKEN_SECRET,
            expiresIn: '15m',
        });
        user.resetPasswordStatus = true;
        await user.save();
        const template = Handlebars.compile(resetPasswordMail_1.resetPasswordMail);
        const data = { url: process.env.BASE_URL + '/auth/verify/resetpassword/' + forgotPasswordToken };
        const htmlBody = template(data);
        try {
            const result = await sendMail_1.sendMail(email, 'Reset Password', htmlBody);
            console.log(result);
        }
        catch (err) {
            console.log(err);
        }
        return 'success!check your mail for resetting the password';
    }
    async validateResetPasswordToken(token) {
        const result = await this.jwtService.verify(token, { secret: process.env.FORGOT_PASSWORD_TOKEN_SECRET });
        if (result) {
            const email = result.email;
            const user = await this.userModel.findOne({ email });
            if (user.resetPasswordStatus)
                return true;
            else
                return false;
        }
    }
    async resetPassword(token, body) {
        const result = await this.jwtService.verify(token, { secret: process.env.FORGOT_PASSWORD_TOKEN_SECRET });
        if (result) {
            const email = result.email;
            const user = await this.userModel.findOne({ email });
            user.password = await this.hashPassword(body.newPassword, user.salt);
            user.resetPasswordStatus = false;
            await user.save();
            return true;
        }
        else
            return false;
    }
    async renewAccessToken(req) {
        const email = req;
        const payload = { email };
        const accessToken = await this.jwtService.sign(payload, {
            secret: process.env.ACCESS_TOKEN_SECRET,
            expiresIn: '15m',
        });
        return { accessToken };
    }
    async hashPassword(password, salt) {
        return bcrypt.hash(password, salt);
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('User')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map