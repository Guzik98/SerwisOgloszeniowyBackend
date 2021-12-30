import { Module } from '@nestjs/common';
import { OfferController } from "./offer.controller";
import { OfferService } from "./offer.service";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "../auth/auth.module";
import { Offer, OfferSchema } from "./schema/offer.schema";
import { OfferRepository } from "./offer.repository";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Offer.name, schema: OfferSchema }]),
    AuthModule,
  ],

  controllers: [OfferController],
  providers: [OfferService, OfferRepository]
})
export class OffersModule {}
