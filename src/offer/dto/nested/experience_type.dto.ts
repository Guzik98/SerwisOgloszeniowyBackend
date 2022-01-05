import { IsNotEmpty } from "class-validator";

export class ExperienceTypeDto {
  @IsNotEmpty()
  company_name: string
  @IsNotEmpty()
  description: string
  @IsNotEmpty()
  job_title: string
}