import { DocumentBuilder, SwaggerCustomOptions, SwaggerDocumentOptions } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
   .setTitle('URL Shortener')
   .setDescription('API REST for the url shortener')
   .setVersion('1.0')
   .addTag('Root')
   .addTag("URL's")
   .addTag('Users')
   .addTag('Visits')
   .build();

export const swaggerDocConfig: SwaggerDocumentOptions = {};

export const swaggerCustomConfig: SwaggerCustomOptions = {
   swaggerOptions: {
      persistAuthorization: true,
   },
   customSiteTitle: 'URL Shortener API Documentation',
};
