import { Injectable, Logger } from "@nestjs/common";
import { AuthRepository } from "src/auth/auth.repository";
import { Offer } from "./schema/offer.schema";
import { OfferRepository } from "./offer.repository";
import { CreateOfferDto } from "./dto/create-offer.dto";
import { User } from "../auth/schema/user.schema";
import { Schema } from "mongoose";

@Injectable()
export class OfferService {
  private logger = new Logger('offers service');

  constructor(
    private authRepository: AuthRepository,
    private offerRepository: OfferRepository
  ){}

  async getAllOffers(): Promise<Offer[]>{
    return this.offerRepository.getAllOffers();
  }

  async createOffer(createOffersDto: CreateOfferDto, user: User): Promise<Offer> {
    createOffersDto.owner = user.email
    const createdOffer = this.offerRepository.createOffer(createOffersDto);
    this.logger.verbose(`user created new Offer ${user.username}`)
    return createdOffer;
  }

  async deleteOfferById(_id: { type: Schema.Types.ObjectId; ref: 'Offer' }): Promise<void>{
    await this.offerRepository.deleteOfferById(_id);
    this.logger.verbose('offer is deleted');
  }

  async updateOfferById(_id: { type: Schema.Types.ObjectId; ref: 'Offer' }, createOffersDto: CreateOfferDto ): Promise<Offer>{
    return this.offerRepository.updateOfferById(_id, createOffersDto)
  }
}
