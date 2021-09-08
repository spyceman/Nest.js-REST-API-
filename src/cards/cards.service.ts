import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class CardsService {
  constructor(private readonly httpService: HttpService) {}

  async getCard(cardID: string) {
    const result = this.httpService.get(
      `https://api.trello.com/1/cards/${cardID}?key=${process.env.TRELLO_KEY}&token=${process.env.TRELLO_TOKEN}`,
    );
    return (await firstValueFrom(result)).data;
  }

  async createCard(name: string, idList: string) {
    const result = this.httpService.post(
      `https://api.trello.com/1/cards?key=${process.env.TRELLO_KEY}&token=${process.env.TRELLO_TOKEN}&name=${name}&idList=${idList}`,
    );
    return (await firstValueFrom(result)).data;
  }

  async updateCard(cardID: string, data: object) {
    const result = this.httpService.put(
      `https://api.trello.com/1/cards/${cardID}?key=${process.env.TRELLO_KEY}&token=${process.env.TRELLO_TOKEN}`,
      data,
    );
    return (await firstValueFrom(result)).data;
  }

  async deleteCard(cardID: string) {
    const result = this.httpService.delete(
      `https://api.trello.com/1/cards/${cardID}?key=${process.env.TRELLO_KEY}&token=${process.env.TRELLO_TOKEN}`,
    );
    return (await firstValueFrom(result)).data;
  }

  async search(query: string) {
    const result = this.httpService.get(
      `https://api.trello.com/1/search?query=${query}&key=${process.env.TRELLO_KEY}&token=${process.env.TRELLO_TOKEN}`,
    );
    return (await firstValueFrom(result)).data;
  }
}
