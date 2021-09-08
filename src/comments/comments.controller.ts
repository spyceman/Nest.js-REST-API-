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
  import { CommentsService } from './comments.service';
  
  @ApiTags('Comments')
  @Controller('comments')
  export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}
  
    @ApiOperation({ summary: 'Getting comments from card by cardID' })
    @ApiResponse({ status: 200 })
    @UseGuards(AuthGuard_1)
    @Get('/:cardID')
    getBoard(@Param('cardID') cardID: string) {
      return this.commentsService.getComments(cardID);
    }
  
    @ApiOperation({ summary: 'Adding comment to the card with cardID' })
    @ApiResponse({ status: 201 })
    @UseGuards(AuthGuard_1)
    @Post('/:cardID/:text')
    createBoard(@Param('cardID') cardID: string, @Param('text') text: string) {
      return this.commentsService.addComment(cardID, text);
    }
  
    @ApiOperation({ summary: 'Deleting comment from card with cardID by idAction' })
    @ApiResponse({ status: 203 })
    @UseGuards(AuthGuard_1)
    @Delete('/:cardID/:idAction')
    deleteComment(@Param('cardID') cardID: string, @Param('idAction') idAction: string) {
      return this.commentsService.deleteComment(cardID, idAction);
    }
  
    @ApiOperation({ summary: 'Updating comment from card with cardID by ' })
    @ApiResponse({ status: 200 })
    @UseGuards(AuthGuard_1)
    @Put('/:cardID/:commentID/:text')
    updateComment(@Param('cardID') cardID: string, @Param('commentID') commentID: string, @Param('text') text: string) {
      return this.commentsService.updateComment(cardID, commentID, text);
    }

    @ApiOperation({ summary: 'Searching with query' })
  @ApiResponse({ status: 200 })
  @UseGuards(AuthGuard_1)
  @Post('/search/:query')
  search(@Param('query') query: string) {
    return this.commentsService.search(query);
  }
  }
  