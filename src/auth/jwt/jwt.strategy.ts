import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthRepository } from "../auth.repository";
import { User } from "../schema/user.schema";
import { serializeUser } from "passport";
import { JwtPayload } from "./jwt-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authRepository: AuthRepository,
  ) {
    super(
      {
        secretOrKey: process.env.SECRETORKEY,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      }
    );
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { username } = payload
    const filter = {
      username: username
    }
    const user: User = await  this.authRepository.findOneUser(filter);

    if(!user){
      throw new UnauthorizedException();
    }

    return user
  }

}