import { DocumentBuilder, SwaggerCustomOptions, SwaggerDocumentOptions } from '@nestjs/swagger';

const swaggerConfiguration = new DocumentBuilder()
   .addBearerAuth({ scheme: 'bearer', type: 'http' })
   .addTag('URLs')
   .addTag('Users')
   .addTag('Visits')
   .setContact(
      'Contact',
      String(process.env.SWAGGER_SITE_URL),
      String(process.env.SWAGGER_CONTACT_EMAIL),
   )
   .setDescription(`API REST for ${process.env.API_NAME}`)
   .setTitle(String(process.env.API_NAME))
   .setVersion(String(process.env.npm_package_version));

if (process.env.NODE_ENV === 'development') {
   swaggerConfiguration.addServer(`http://localhost:${process.env.PORT}`);
}
if (process.env.NODE_ENV === 'production') {
   swaggerConfiguration.addServer(String(process.env.SERVER_URL));
}

export const swaggerConfig = swaggerConfiguration.build();

export const swaggerDocConfig: SwaggerDocumentOptions = {};

export const swaggerCustomConfig: SwaggerCustomOptions = {
   swaggerOptions: {
      persistAuthorization: true,
   },
   customSiteTitle: `${process.env.API_NAME} API Documentation`,
};
