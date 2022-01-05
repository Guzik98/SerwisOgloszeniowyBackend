import { IsEmail, IsEnum, IsString, MaxLength, MinLength } from "class-validator";
import { Role } from "../enum/role";

export class AuthCredentialsDto {
  @IsString()
  @MinLength(3)
  username: string

  @IsString()
  @IsEmail()
  email: string

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  password: string

  @IsEnum(Role)
  role: Role
}