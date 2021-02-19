import { IsString, MaxLength, MinLength } from "class-validator";

export class UserSignupCredentials {
  @IsString()
  @MinLength(3)
  username: string;

  @IsString()
  @MinLength(10)
  email: string;

  @MinLength(8)
  @MaxLength(20)
  @IsString()
  password: string;
}
