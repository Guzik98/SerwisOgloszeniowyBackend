import { Body, Controller, Logger, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { User } from "./schema/user.schema";
import { LoginCredentialsDto } from "./dto/login-credentials.dto";

@Controller('auth')
export class AuthController {
  private logger = new Logger('AuthController');

  constructor(private  authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<User> {
    this.logger.verbose(`User ${authCredentialsDto.username} is trying to create account`);
    return  this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  signIn(@Body() loginCredentialsDto: LoginCredentialsDto): Promise<{ accessToken: string}> {
    this.logger.verbose(`User ${loginCredentialsDto.email} is trying to login in`)
    return  this.authService.singIn(loginCredentialsDto);
  }
}
