import { ConflictException, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthRepository } from "./auth.repository";
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { User } from './schema/user.schema';
import { LoginCredentialsDto } from "./dto/login-credentials.dto";
import { JwtPayload } from "./jwt/jwt-payload.interface";

@Injectable()
export class AuthService {
  private logger = new Logger(`AuthService`);

  constructor(
    private jwtService: JwtService,
    private readonly authRepository: AuthRepository
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    const { password, email } = authCredentialsDto;
    const salt = await bcrypt.genSalt();
    const hashed = await bcrypt.hash(password, salt);
    const createUser = ({ ...authCredentialsDto, password: hashed });

    const user = await this.authRepository.findOneUser({ email: email })

    if (!user) {
      this.logger.verbose('New account is created');
      return this.authRepository.createUser(createUser);
    }

    this.logger.error('That email is already register')
    throw new ConflictException('Account with that email already exists')
  }

  async singIn(loginCredentialsDto: LoginCredentialsDto, response): Promise<void> {
    const { email, password } = loginCredentialsDto
    const user = await this.authRepository.findOneUser({ email: email });

    if (!user) {
      this.logger.error('user was not found');
      throw new UnauthorizedException('Please check your email and password')
    }

    if (!await bcrypt.compare(password, user.password)) {
      this.logger.error('Invalid password');
      throw new UnauthorizedException('Please check your email and password')
    }

    const payload: JwtPayload = { username: user.username, email: user.email };

    const accessToken = this.jwtService.sign(payload);

    response.cookie('jwt', accessToken, { httpOnly: true, expires: new Date(Date.now() + 1000 * 3600) });

    this.logger.verbose(`${user.username} is logged in`);
  }

  async checkUser(request): Promise<void> {
    try {
      const cookie = request.cookies['jwt'];
      const data = await this.jwtService.verifyAsync(cookie);

      if (!data) {
        throw new UnauthorizedException();
      }
      return data;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}

