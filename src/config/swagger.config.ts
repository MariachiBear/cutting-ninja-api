import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
   .setTitle('URL Shortener')
   .setDescription('API REST for the url shortener')
   .setVersion('1.0')
   .build();
