import { Injectable, Logger } from "@nestjs/common";
import { AuthRepository } from "src/auth/auth.repository";
import { Offer } from "./schema/offer.schema";
import { OfferRepository } from "./offer.repository";
import { CreateOfferDto } from "./dto/create-offer.dto";
import { User } from "../auth/schema/user.schema";

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

  async findUserAndUpdate(offer: Offer, user: User, todo: string): Promise<void> {
    const filter = { email: user.email };
    let update;
    if(todo === 'add'){
      update = { offers: [...user.offers, offer._id] };
    }

    if (todo === 'delete'){
      update = { "$pull" : { "offers" :  offer._id } };
    }

    await this.authRepository.findUserAndUpdate(filter, update);
  }

  async createOffer(createOffersDto: CreateOfferDto, user: User): Promise<Offer> {
    const createdOffer = this.offerRepository.createOffer(createOffersDto);
    this.logger.verbose(`user created new Offer ${user.username}`)

    await this.findUserAndUpdate(await createdOffer, user, 'add');
    this.logger.verbose(`user account updated`);

    return createdOffer;
  }

}
