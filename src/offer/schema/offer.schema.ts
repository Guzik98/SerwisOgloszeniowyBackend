import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";

@Schema({_id: false})
export class Salary {
  @Prop()
  from: number
  @Prop()
  to: number
  @Prop()
  currency: string
}

@Schema({_id: false})
export class Skill {
  @Prop()
  name: string;
  @Prop()
  level: number;
}

export const SkillSchema = SchemaFactory.createForClass(Skill);

@Schema({_id: false})
export class Certificate {
  @Prop()
  name: string;
  @Prop()
  institution: string;
}

export const CertificateSchema = SchemaFactory.createForClass(Certificate);

@Schema({_id: false})
export class Language {
  @Prop()
  name: string;
  @Prop()
  level: string;
}

export const LanguageSchema = SchemaFactory.createForClass(Language);

@Schema({_id: false})
export class Education {
  @Prop()
  school_name: string;
  @Prop()
  degree: string;
  @Prop()
  area: string
}

export const EducationSchema = SchemaFactory.createForClass(Education);

@Schema({_id: false})
export class Experience {
  @Prop()
  company_name: string;
  @Prop()
  description: string;
  @Prop()
  job_title: string
}

export const ExperienceSchema = SchemaFactory.createForClass(Experience);

@Schema({_id: false})
export class Project {
  @Prop()
  project_name: string;
  @Prop()
  description: string;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);

@Schema({_id: false})
export class Employment_types {
  @Prop()
  type: string
  @Prop()
  salary: Salary
}

export const Employment_typesSchema = SchemaFactory.createForClass(Employment_types);

export type OfferDocument = Offer & Document

@Schema()
export class Offer {
  _id: mongoose.Schema.Types.ObjectId
  @Prop()
  owner: string;
  @Prop()
  name: string;
  @Prop()
  surname: string;
  @Prop()
  short_personal_description: string;
  @Prop()
  photo_url: string
  @Prop()
  title: string;
  @Prop()
  street: string;
  @Prop()
  city: string;
  @Prop()
  address_text: string;
  @Prop()
  marker_icon: string;
  @Prop()
  email: string
  @Prop()
  github_url: string
  @Prop()
  Linkedln_url: string
  @Prop()
  phone_number: string
  @Prop()
  education: Education[] | null
  @Prop()
  certificate: Certificate[] | null
  @Prop()
  experience: Experience[] | null
  @Prop()
  project: Project[] | null
  @Prop()
  Languages: Language[]
  @Prop()
  experience_level: string;
  @Prop()
  latitude: string;
  @Prop()
  longitude: string;
  @Prop()
  published_at: string;
  @Prop()
  country_code: string
  @Prop()
  employment_type: Employment_types[]
  @Prop()
  skills: Skill[]
}

export const OfferSchema = SchemaFactory.createForClass(Offer);