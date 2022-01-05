import { Module } from '@nestjs/common';
import { MONGO_CONNECTION } from "./app.properties";
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from "@nestjs/mongoose";
import {  OffersModule } from "./offer/offer.module";
import { PhotoController } from './photo/photo.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from "path";

@Module({
  imports: [
    AuthModule,
    OffersModule,
    MongooseModule.forRoot(MONGO_CONNECTION),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
    }),
  ],
  controllers: [PhotoController],
})

export class AppModule {}
