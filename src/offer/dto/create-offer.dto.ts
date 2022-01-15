import { ArrayMinSize, IsArray, IsDefined, IsEmail, IsEnum, IsNotEmpty, ValidateNested } from "class-validator";
import { MarkerIcon } from "../enums/MarkerIcon";
import { ExperienceLevel } from "../enums/experience_level.enum";
import { Prop } from "@nestjs/mongoose";
import { Type } from "class-transformer";
import { EducationTypeDto } from "./nested/education_type.dto";
import { CertificateTypeDto } from "./nested/certificate_type.dto";
import { ExperienceTypeDto } from "./nested/experience_type.dto";
import { ProjectTypeDto } from "./nested/project_type.dto";
import { EmploymentTypeDto } from "./nested/employment_type.dto";
import { SkillTypeDto } from "./nested/skill_type.dto";
import { languageTypeDto } from "./nested/language_type.dto";

export class CreateOfferDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  surname: string;

  @IsNotEmpty()
  short_personal_description: string

  @IsNotEmpty()
  photo_url: string

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  street: string;

  @IsNotEmpty()
  city: string;

  @Prop()
  country_code: string

  @IsNotEmpty()
  address_text: string;

  @IsNotEmpty()
  @IsEmail()
  email: string

  github_url: string
  linkedin_url: string
  phone_number: string


  education: EducationTypeDto[] | null

  certificate: CertificateTypeDto[] | null

  experience: ExperienceTypeDto[] | null

  project: ProjectTypeDto[] | null

  @IsEnum(MarkerIcon)
  @IsNotEmpty()
  marker_icon: string;

  @IsNotEmpty()
  language: languageTypeDto[] | null

  @IsEnum(ExperienceLevel)
  experience_level: string

  @IsNotEmpty()
  latitude: string;

  @IsNotEmpty()
  longitude: string;

  @IsNotEmpty()
  published_at: string;

  owner: string

  employment_type : EmploymentTypeDto[]

  skills: SkillTypeDto[]
}


