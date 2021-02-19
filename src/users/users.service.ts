import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from 'src/schema/user.schema';
import { UserSignupCredentials } from './dto/UserSignupCredentials.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<UserDocument>) { }

    async signUp(userSignupCredentials: UserSignupCredentials): Promise<string> {
        const { username, email, password } = userSignupCredentials;
        const user = await this.userModel.findOne({ email });
        if (user) {
            return 'User already exist';
        }
        const new_user = new this.userModel();
        new_user.username = username;
        new_user.email = email;
        new_user.salt = await bcrypt.genSalt();
        new_user.password = await this.hashPassword(password, new_user.salt);
        await new_user.save();
        return 'User signed up successfully !'
    }
    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }
}
