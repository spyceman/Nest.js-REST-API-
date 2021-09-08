import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard_1 } from '../login/auth.guard';
import { CardsService } from './cards.service';

@ApiTags('Cards')
@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @ApiOperation({ summary: 'Getting card by id' })
  @ApiResponse({ status: 200 })
  @UseGuards(AuthGuard_1)
  @Get('/:cardID')
  getCard(@Param('cardID') cardID: string) {
    return this.cardsService.getCard(cardID);
  }

  @ApiOperation({ summary: 'Creating card' })
  @ApiResponse({ status: 201 })
  @UseGuards(AuthGuard_1)
  @Post('/:name/:idList')
  createCard(@Param('name') name: string, @Param('idList') idList: string) {
    return this.cardsService.createCard(name, idList);
  }

  @ApiOperation({ summary: 'Deleting card by id' })
  @ApiResponse({ status: 203 })
  @UseGuards(AuthGuard_1)
  @Delete('/:id')
  deleteCard(@Param('id') id: string) {
    return this.cardsService.deleteCard(id);
  }

  @ApiOperation({ summary: 'Updating card by id' })
  @ApiResponse({ status: 200 })
  @UseGuards(AuthGuard_1)
  @Put('/:id')
  updateCard(@Param('id') id: string, @Body() data: object) {
    return this.cardsService.updateCard(id, data);
  }

  @ApiOperation({ summary: 'Searching with query' })
  @ApiResponse({ status: 200 })
  @UseGuards(AuthGuard_1)
  @Post('/search/:query')
  search(@Param('query') query: string) {
    return this.cardsService.search(query);
  }
}
