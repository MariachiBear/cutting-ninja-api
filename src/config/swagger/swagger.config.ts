import { DocumentBuilder, SwaggerCustomOptions, SwaggerDocumentOptions } from '@nestjs/swagger';

const swaggerConfiguration = new DocumentBuilder()
   .addBearerAuth({ scheme: 'bearer', type: 'http' })
   .addServer(String(process.env.SERVER_URL))
   .addTag('URLs')
   .addTag('Users')
   .addTag('Visits')
   .setContact('Contact', 'https://rubenconde.com', 'support@rubn.xyz')
   .setDescription('API REST for Cutting Ninja')
   .setTitle('Cutting Ninja')
   .setVersion(String(process.env.npm_package_version));

if (process.env.NODE_ENV === 'development') {
   swaggerConfiguration.addServer(`http://localhost:${process.env.PORT}`);
}

export const swaggerConfig = swaggerConfiguration.build();

export const swaggerDocConfig: SwaggerDocumentOptions = {};

export const swaggerCustomConfig: SwaggerCustomOptions = {
   swaggerOptions: {
      persistAuthorization: true,
   },
   customSiteTitle: 'Cutting Ninja API Documentation',
};
