import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FacebookStrategy } from "./facebook.strategy";
import { LoginModule } from './login/login.module';
import { HttpModule, HttpService } from '@nestjs/axios';
import { BoardsModule } from './boards/boards.module';
import { CardsModule } from './cards/cards.module';
import { CommentsModule } from './comments/comments.module';
import * as dotenv from 'dotenv';

dotenv.config()

@Module({
  imports: [
    MongooseModule.forRoot(process.env.URI, {
      useFindAndModify: false,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }),
    LoginModule,
    BoardsModule,
    CardsModule,
    CommentsModule,
  ],
  controllers: [],
  providers: [FacebookStrategy],
})
export class AppModule {}
