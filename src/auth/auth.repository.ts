import { Injectable } from "@nestjs/common";
import { User, UserDocument } from "./schema/user.schema";
import { FilterQuery, Model, UpdateQuery } from "mongoose";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { InjectModel } from "@nestjs/mongoose";


@Injectable()
export class AuthRepository {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>
  ) {
  }

  async createUser(user: AuthCredentialsDto): Promise<User> {
    return await new this.userModel(user).save();
  }

  async findOneUser(filter: FilterQuery<UserDocument>): Promise<User> {
    return this.userModel.findOne(filter);
  }

  async findUserAndUpdate(filter: FilterQuery<UserDocument>, update: UpdateQuery<UserDocument>): Promise<UserDocument> {
    return this.userModel.findOneAndUpdate(filter, update, { returnOriginal: false });
  }
}