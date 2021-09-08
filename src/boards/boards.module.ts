import {HttpModule, HttpService} from '@nestjs/axios'
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';

@Module({
  imports: [HttpModule,
    JwtModule.register({
      secret: 'secret',
      signOptions: {
        expiresIn: '1h'
      }
    })],
  controllers: [BoardsController],
  providers: [BoardsService],
  exports: [BoardsService, JwtModule]
})
export class BoardsModule {}
