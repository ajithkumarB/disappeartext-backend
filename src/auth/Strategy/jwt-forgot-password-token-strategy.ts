import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtPayload } from "../Interfaces/jwt-payload.interface";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserDocument } from "src/schema/user.schema";

@Injectable()
export class JwtForgotPasswordTokenStrategy extends PassportStrategy(
    Strategy,
    "jwt-forgot-password-token"
) {
    constructor(
        @InjectModel("User") private readonly userModel: Model<UserDocument>
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.FORGOT_PASSWORD_TOKEN_SECRET,
        });
    }

    async validate(payload: JwtPayload) {
        const { email } = payload;
        const user = await this.userModel.findOne({ email });

        if (!user) {
            throw new UnauthorizedException();
        }

        return user.email;
    }
}
