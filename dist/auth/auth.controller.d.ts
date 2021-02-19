import { AuthService } from './auth.service';
import { EmailDto } from './dto/email.dto';
import { UserLoginCredentialsDto } from './dto/userLoginCredentials.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signIn(userLoginCredentialsDto: UserLoginCredentialsDto, res: any): Promise<any>;
    forgotPassword(emailDto: EmailDto, res: any): Promise<any>;
    validateResetPasswordToken(req: any, res: any): Promise<void>;
    resetPassword(req: any, res: any): Promise<void>;
    renewAccessToken(req: any): Promise<{
        accessToken: string;
    }>;
}
