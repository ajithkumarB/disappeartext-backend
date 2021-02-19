import { Body, Controller, HttpStatus, Post, Res, ValidationPipe } from '@nestjs/common';
import { UserSignupCredentials } from './dto/UserSignupCredentials.dto';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('signup')
  async signUp(@Body(ValidationPipe) userSignupCredentials:UserSignupCredentials,@Res() res){
    const response = await this.usersService.signUp(userSignupCredentials);
    return res.status(HttpStatus.OK).json({
      message:response
    })
  }

}
