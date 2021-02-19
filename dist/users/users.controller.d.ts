import { UserSignupCredentials } from './dto/UserSignupCredentials.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    signUp(userSignupCredentials: UserSignupCredentials, res: any): Promise<any>;
}
