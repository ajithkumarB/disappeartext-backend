import { Document } from 'mongoose';
export declare type UserDocument = User & Document;
export declare class User {
    username: string;
    email: string;
    password: string;
    salt: string;
    resetPasswordStatus: boolean;
}
export declare const UserSchema: import("mongoose").Schema<Document<User>, import("mongoose").Model<Document<User>>, undefined>;
