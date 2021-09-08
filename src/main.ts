import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as http from 'http';
import * as https from 'https';
import * as path from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  dotenv.config();
  const server = express();
  const httpsOptions = {
    key: fs.readFileSync(path.resolve(__dirname, './', 'secrets/key.pem')),
    cert: fs.readFileSync(path.resolve(__dirname, './', 'secrets/cert.pem')),
    passphrase: '1234'
  };
  const PORT = process.env.PORT || 3000;
  const PORT_S = process.env.PORT_S || 443;
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  const config = new DocumentBuilder()
    .setTitle('Final task')
    .setDescription('Nestjs REST API')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);
  await app.init()
  http.createServer(server).listen(PORT);
  https.createServer(httpsOptions, server).listen(PORT_S);

}
bootstrap();
