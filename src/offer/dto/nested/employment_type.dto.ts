import { EmploymentType } from "../../enums/employment_type.enum";
import { SalaryTypeDto } from "./salary_type.dto";
import { IsEnum } from "class-validator";

export class EmploymentTypeDto {
  @IsEnum(EmploymentType)
  type: string
  salary: SalaryTypeDto
}