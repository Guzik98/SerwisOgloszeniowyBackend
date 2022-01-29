import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from 'passport-jwt';
import { AuthRepository } from "../auth.repository";
import { User } from "../schema/user.schema";
import { JwtPayload } from "./jwt-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authRepository: AuthRepository,
  ) {
    super(
      {
        secretOrKey: process.env.SECRETORKEY,
        jwtFromRequest: (req) => {
          if (!req || !req.cookies) return null;
          return req.cookies['jwt'];
        },
        ignoreExpiration: false,
      }
    );
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { email } = payload
    const user: User = await  this.authRepository.findOneUser({ email: email });

    if(!user){
      throw new UnauthorizedException();
    }

    return user
  }

}