import { IsEmail, IsString } from "class-validator";

export class LoginCredentialsDto {
  @IsEmail()
  @IsString()
  email: string
  @IsString()
  password: string
}