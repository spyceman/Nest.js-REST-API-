import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class BoardsService {
  constructor(private readonly httpService: HttpService) {
    
  }
  
  async getBoards(memberID: string) {
    const result = this.httpService.get(
      `https://api.trello.com/1/members/${memberID}/boards?fields=name,url&key=${process.env.TRELLO_KEY}&token=${process.env.TRELLO_TOKEN}`,
    );
    return (await firstValueFrom(result)).data;
  }

  async getBoard(boardID: string) {
    const result = this.httpService.get(
      `https://api.trello.com/1/boards/${boardID}?key=${process.env.TRELLO_KEY}&token=${process.env.TRELLO_TOKEN}`,
    );
    return (await firstValueFrom(result)).data;
  }

  async createBoard(boardName: string) {
    const result = this.httpService.post(
      `https://api.trello.com/1/boards?key=${process.env.TRELLO_KEY}&token=${process.env.TRELLO_TOKEN}&name=${boardName}`,
    );
    return (await firstValueFrom(result)).data;
  }

  async updateBoard(boardID: string, data: object) {
    const result = this.httpService.put(
      `https://api.trello.com/1/boards/${boardID}?key=${process.env.TRELLO_KEY}&token=${process.env.TRELLO_TOKEN}`,
      data,
    );
    return (await firstValueFrom(result)).data;
  }

  async deleteBoard(boardID: string) {
    const result = this.httpService.delete(
      `https://api.trello.com/1/boards/${boardID}?key=${process.env.TRELLO_KEY}&token=${process.env.TRELLO_TOKEN}`,
    );
    return (await firstValueFrom(result)).data;
  }

  async search(query: string) {
    const result = this.httpService.get(
      `https://api.trello.com/1/search?query=${query}&key=${process.env.TRELLO_KEY}&token=${process.env.TRELLO_TOKEN}`,
    );
    return (await firstValueFrom(result)).data;
  }

  async addMember(boardID: string, memberID: string, memberRole: string) {
    const result = this.httpService.put(
      `https://api.trello.com/1/boards/${boardID}/members/${memberID}?key=${process.env.TRELLO_KEY}&token=${process.env.TRELLO_TOKEN}&type=${memberRole}`,
    );
    return (await firstValueFrom(result)).data;
  }
  
}
