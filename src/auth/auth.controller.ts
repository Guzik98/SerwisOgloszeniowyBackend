import { Body, Controller, Get, Logger, Post, Req, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { User } from "./schema/user.schema";
import { LoginCredentialsDto } from "./dto/login-credentials.dto";
import { Response, Request } from 'express';

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
  signIn(
    @Body() loginCredentialsDto: LoginCredentialsDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<void> {
    this.logger.verbose(`User ${loginCredentialsDto.email} is trying to login in`)
    return this.authService.singIn(loginCredentialsDto, response);
  }

  @Get('/user')
  user(@Req() request: Request) {
    return this.authService.checkUser(request);
  }

  @Get('/logout')
  async logout(@Res({ passthrough: true }) response: Response,): Promise<any> {
    this.logger.verbose('User is logged out')
    response.cookie('jwt','', { expires: new Date() })
  }

}
