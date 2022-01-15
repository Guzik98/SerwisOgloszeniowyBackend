import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { OfferService } from "./offer.service";
import { Offer } from "./schema/offer.schema";
import { GetUser } from '../auth/get-user.decorator';
import { AuthGuard } from "@nestjs/passport";
import { User } from "../auth/schema/user.schema";
import { CreateOfferDto } from "./dto/create-offer.dto";
import { Schema } from "mongoose";

@Controller('/offer')
export class OfferController {
  private logger = new Logger('Offer Controller');

  constructor(private offerService: OfferService) {}

  @Get()
  GetAllOffers(): Promise<Offer[]> {
    this.logger.verbose('User is trying to get all offers')
    return this.offerService.getAllOffers()
  }

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

  @UseGuards(AuthGuard())
  @Delete('/your-offers/:_id')
  deleteOfferById(
    @Param('_id') _id: { type: Schema.Types.ObjectId; ref: 'Offer' },
  ): Promise<void>{
    return  this.offerService.deleteOfferById(_id)
  }

  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  @Post('/your-offers/:_id')
  updateOfferById(
    @Param('_id') _id: { type: Schema.Types.ObjectId; ref: 'Offer' },
    @Body() createOffersDto: CreateOfferDto
  ): Promise<Offer>{
    return this.offerService.updateOfferById(_id, createOffersDto)
  }

}
