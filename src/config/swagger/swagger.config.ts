import { DocumentBuilder, SwaggerCustomOptions, SwaggerDocumentOptions } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
   .addBearerAuth({ scheme: 'bearer', type: 'http' })
   .addServer(String(process.env.SERVER_URL))
   .addTag('URLs')
   .addTag('Users')
   .addTag('Visits')
   .setContact('Contact', 'https://rubenconde.com', 'support@rubn.xyz')
   .setDescription('API REST for the url shortener')
   .setTitle('URL Shortener')
   .setVersion(String(process.env.npm_package_version))
   .build();

export const swaggerDocConfig: SwaggerDocumentOptions = {};

export const swaggerCustomConfig: SwaggerCustomOptions = {
   swaggerOptions: {
      persistAuthorization: true,
   },
   customSiteTitle: 'URL Shortener API Documentation',
};
