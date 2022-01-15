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
    private readonly  authRepository: AuthRepository
  ){}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    const { password, email} = authCredentialsDto;
    const salt = await bcrypt.genSalt();
    const hashed = await bcrypt.hash(password, salt);
    const createUser = ({ ...authCredentialsDto, password: hashed });

    const filter = { email: email };

    return await this.authRepository.findOneUser(filter)
      .then((response) => {
        if(response === null){
          return this.authRepository.createUser(createUser);
        } else {
          this.logger.error('That email is already register')
          throw new ConflictException('Account with that email already exists')
        }
      })
  }

  async singIn(loginCredentialsDto: LoginCredentialsDto): Promise<{ accessToken: string}> {
    const { email, password } = loginCredentialsDto
    const filter = {
      email: email
    }
    const user = await this.authRepository.findOneUser(filter);
    if (user && (await bcrypt.compare(password, user.password))){
      return this.founded(user)

    } else {
      this.logger.error('user was not found');
      throw new UnauthorizedException('Please check your email and password')
    }
  }

  founded(user){
    const payload: JwtPayload = { username: user.username, email: user.email };
    const accessToken = this.jwtService.sign(payload);

    this.logger.verbose(`${user.username} is logged in`);
    return { accessToken };
  }
}


