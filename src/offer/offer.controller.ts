import { Body, Controller, Get, Logger, Post, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { OfferService } from "./offer.service";
import { Offer } from "./schema/offer.schema";
import { GetUser } from '../auth/get-user.decorator';
import { AuthGuard } from "@nestjs/passport";
import { User } from "../auth/schema/user.schema";
import { CreateOfferDto } from "./dto/create-offer.dto";

@Controller('/offer')
export class OfferController {
  private logger = new Logger('Offer Controller');

  constructor(private offerService: OfferService) {}

  @UseGuards(AuthGuard())
  @Post()
  @UsePipes(ValidationPipe)
  async createOffer(
    @Body() createOffersDto: CreateOfferDto,
    @GetUser() user: User
  ): Promise<Offer>{
    this.logger.verbose(`User ${user.username} is creating new task.`)
    return this.offerService.createOffer(createOffersDto, user);
  }

  @Get()
  GetAllOffers(): Promise<Offer[]> {
    this.logger.verbose('User is trying to get all offers')
    return this.offerService.getAllOffers()
  }
}
