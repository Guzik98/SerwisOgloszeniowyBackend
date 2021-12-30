import { Module } from '@nestjs/common';
import { MONGO_CONNECTION } from "./app.properties";
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from "@nestjs/mongoose";
import {  OffersModule } from "./offer/offer.module";

@Module({
  imports: [
    AuthModule,
    OffersModule,
    MongooseModule.forRoot(MONGO_CONNECTION),
  ],
})
export class AppModule {}
