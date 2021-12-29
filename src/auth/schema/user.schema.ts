import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";

export type UserDocument = User & Document

@Schema()
export class User {
  @Prop()
  username: string;
  @Prop()
  password: string;
  @Prop()
  email: string;
  @Prop()
  role: string;
  @Prop()
  offers: [{ type: mongoose.Types.ObjectId, ref: 'Offer' }]
}

export const UserSchema = SchemaFactory.createForClass(User);