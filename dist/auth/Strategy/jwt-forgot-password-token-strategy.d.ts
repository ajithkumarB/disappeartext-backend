import { JwtPayload } from "../Interfaces/jwt-payload.interface";
import { Model } from "mongoose";
import { UserDocument } from "src/schema/user.schema";
declare const JwtForgotPasswordTokenStrategy_base: new (...args: any[]) => any;
export declare class JwtForgotPasswordTokenStrategy extends JwtForgotPasswordTokenStrategy_base {
    private readonly userModel;
    constructor(userModel: Model<UserDocument>);
    validate(payload: JwtPayload): Promise<string>;
}
export {};
