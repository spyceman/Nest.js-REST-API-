import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import * as dotenv from 'dotenv';
import { SMTPClient } from 'emailjs';

dotenv.config();

const client = new SMTPClient({
  user: 'user',
  password: 'password',
  host: 'smtp.your-email.com',
  ssl: true,
});

@Injectable()
export class CommentsService {
  constructor(private readonly httpService: HttpService) {}

  async getComments(cardID: string) {
    const result = this.httpService.get(
      `https://api.trello.com/1/cards/${cardID}?key=${process.env.TRELLO_KEY}&token=${process.env.TRELLO_TOKEN}$fields=comments`,
    );
    return (await firstValueFrom(result)).data;
  }

  async addComment(cardID: string, text: string) {
    const result = this.httpService.post(
      `https://api.trello.com/1/cards/${cardID}/actions/comments?key=${process.env.TRELLO_KEY}&token=${process.env.TRELLO_TOKEN}&text=${text}`,
    );
    const users = this.httpService.post(
      `https://api.trello.com/1/cards/${cardID}/members?key=${process.env.TRELLO_KEY}&token=${process.env.TRELLO_TOKEN}&text=${text}`,
    );
    const userData = (await firstValueFrom(users)).data;
    for (let user of userData){
      if (user.name.includes(text)) {
      //   await client.sendAsync({
      //     text: 'your position changed or removed',
      //     from: 'you <username@your-email.com>',
      //     to: 'someone <someone@your-email.com>, another <another@your-email.com>',
      //     cc: 'else <else@your-email.com>',
      //     subject: 'change',
      // });
      }
    }
    return (await firstValueFrom(result)).data;
  }

  async updateComment(cardID: string, commentID: string, text: string) {
    const result = this.httpService.put(
      `https://api.trello.com/1/cards/${cardID}/actions/${commentID}/comments?key=${process.env.TRELLO_KEY}&token=${process.env.TRELLO_TOKEN}&text=${text}`,
    );
    return (await firstValueFrom(result)).data;
  }

  async deleteComment(cardID: string, idAction: string) {
    const result = this.httpService.delete(
      `https://api.trello.com/1/cards/${cardID}/actions/${idAction}/comments?key=${process.env.TRELLO_KEY}&token=${process.env.TRELLO_TOKEN}`,
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
