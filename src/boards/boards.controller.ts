import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  UseGuards,
  HttpStatus,
  Req,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/login/roles.guard';
import { AuthGuard_1 } from '../login/auth.guard';
import { BoardsService } from './boards.service';

@ApiTags('Boards')
@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @ApiOperation({ summary: "Getting user's boards by id" })
  @ApiResponse({ status: 200 })
  @UseGuards(AuthGuard_1)
  @Get('user/:id')
  getBoards(@Param('id') id: string) {
    return this.boardsService.getBoards(id);
  }

  @ApiOperation({ summary: 'Getting board by id' })
  @ApiResponse({ status: 200 })
  @UseGuards(AuthGuard_1)
  @Get('/:boardID')
  getBoard(@Param('boardID') boardID: string) {
    return this.boardsService.getBoard(boardID);
  }

  @ApiOperation({ summary: 'Creating board' })
  @ApiResponse({ status: 201 })
  @UseGuards(AuthGuard_1)
  @Post('/:name')
  createBoard(@Param('name') name: string) {
    return this.boardsService.createBoard(name);
  }

  @ApiOperation({ summary: 'Deleting board by id' })
  @ApiResponse({ status: 203 })
  @UseGuards(AuthGuard_1)
  @Delete('/:id')
  deleteBoard(@Param('id') id: string) {
    return this.boardsService.deleteBoard(id);
  }

  @ApiOperation({ summary: 'Updating board by id' })
  @ApiResponse({ status: 200 })
  @UseGuards(AuthGuard_1)
  @Put('/:id')
  updateBoard(@Param('id') id: string, @Body() data: object) {
    return this.boardsService.updateBoard(id, data);
  }

  @ApiOperation({
    summary:
      'Adding member with memberID and memberRole to the board with boardID',
  })
  @ApiResponse({ status: 200 })
  @UseGuards(RolesGuard)
  @Put('/:boardID/:memberID/:memberRole')
  addMember(
    @Param('boardID') boardID: string,
    @Param('memberID') memberID: string,
    @Param('memberRole') memberRole: string,
  ) {
    return this.boardsService.addMember(boardID, memberID, memberRole);
  }

  @ApiOperation({ summary: 'Searching with query' })
  @ApiResponse({ status: 200 })
  @UseGuards(AuthGuard_1)
  @Post('/search/:query')
  search(@Param('query') query: string) {
    return this.boardsService.search(query);
  }
}
