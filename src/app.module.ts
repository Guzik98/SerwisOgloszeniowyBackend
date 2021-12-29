import { Module } from '@nestjs/common';
import { MONGO_CONNECTION } from "./app.properties";
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot(MONGO_CONNECTION),
  ],
})
export class AppModule {}
