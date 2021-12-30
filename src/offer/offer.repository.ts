import { Offer, OfferDocument } from "./schema/offer.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
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

}