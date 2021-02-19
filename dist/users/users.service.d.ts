import { Model } from 'mongoose';
import { UserDocument } from 'src/schema/user.schema';
import { UserSignupCredentials } from './dto/UserSignupCredentials.dto';
export declare class UsersService {
    private readonly userModel;
    constructor(userModel: Model<UserDocument>);
    signUp(userSignupCredentials: UserSignupCredentials): Promise<string>;
    private hashPassword;
}
