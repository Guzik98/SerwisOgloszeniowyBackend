import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from "@nestjs/mongoose";
import {  OffersModule } from "./offer/offer.module";
import { PhotoController } from './photo/photo.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { join } from "path";

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    OffersModule,
    MongooseModule.forRoot(process.env.MONGO_CONNECTION),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
    }),
  ],
  controllers: [PhotoController],
})

export class AppModule {}
