import { IsNotEmpty, IsString } from "class-validator";

export class EducationTypeDto {
  @IsNotEmpty()
  @IsString()
  school_name: string
  @IsString()
  @IsNotEmpty()
  degree: string
  @IsString()
  @IsNotEmpty()
  area: string
}