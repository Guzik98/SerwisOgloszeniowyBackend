import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from "@nestjs/jwt";
import { AuthService } from './auth.service';
import { PassportModule } from "@nestjs/passport";
import { User, UserSchema } from "./schema/user.schema";
import { JwtStrategy } from "./jwt/jwt.strategy";
import { AuthRepository } from "./auth.repository";
import { AuthController } from "./auth.controller";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret: 'topSecret51',
      signOptions: {
        expiresIn: 3600,
      }
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema}]),
  ],
  providers: [AuthService, JwtStrategy, AuthRepository],
  controllers: [AuthController],
  exports: [JwtStrategy, PassportModule, AuthRepository],
})
export class AuthModule {}
