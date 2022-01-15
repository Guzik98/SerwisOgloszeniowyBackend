import { Offer, OfferDocument } from "./schema/offer.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Schema } from "mongoose";
import { CreateOfferDto } from "./dto/create-offer.dto";

export class OfferRepository {

  constructor (
    @InjectModel(Offer.name)
    private offerModel: Model<OfferDocument>
  ) {}

  async getAllOffers(): Promise<Offer[]> {
    return await this.offerModel.find().exec();
  }

  async createOffer(createOffersDto: CreateOfferDto): Promise<Offer> {
    return new this.offerModel(createOffersDto).save()
  }

  async deleteOfferById(_id: { type: Schema.Types.ObjectId; ref: "Offer"; } ): Promise<Offer>{
    return this.offerModel.findByIdAndRemove({ "_id": _id });
  }

  async updateOfferById(_id: { type: Schema.Types.ObjectId}, update) : Promise<Offer>{
    return this.offerModel.findByIdAndUpdate({ "_id": _id }, update,{ returnOriginal: false })
  }

}