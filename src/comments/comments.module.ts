import { Module } from '@nestjs/common';
import {HttpModule, HttpService} from '@nestjs/axios';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    JwtModule.register({
		secret: 'secret',
		signOptions: {
			expiresIn: '1h'
		}
	}),
HttpModule],
  providers: [CommentsService],
  controllers: [CommentsController],
  exports: [CommentsService, JwtModule]
})
export class CommentsModule {}
