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
    const { username, password, role, email, name, surname } = authCredentialsDto;
    const salt = await bcrypt.genSalt();
    const hashed = await bcrypt.hash(password, salt);
    const createUser = ({ username: username, password: hashed,name: name, surname: surname, role: role, email: email })
    const filter = {
      email: email
    }
    return await this.authRepository.findOneUser(filter)
      .then((response) => {
        if(response === null){
          return this.authRepository.createUser(createUser);
        } else {
          this.logger.error('That email is already register')
          throw new ConflictException('Account with that email is already exists')
        }
      })
  }

  async singIn(loginCredentialsDto: LoginCredentialsDto): Promise<{ accessToken: string}> {
    const { email, password } = loginCredentialsDto
    const filter = {
      email: email
    }
    const user = await this.authRepository.findOneUser(filter);
    if (user && (await  bcrypt.compare(password, user.password))){
      const role = user.role;
      const username  = user.username;
      const payload: JwtPayload = { username, role  };
      const accessToken = this.jwtService.sign(payload);
      this.logger.verbose(`${username} is logged in`);
      return { accessToken };
    } else {
      this.logger.error('user was not found');
      throw new UnauthorizedException('Please check your email and password')
    }
  }
}
