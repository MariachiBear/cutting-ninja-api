import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { SwaggerModule } from '@nestjs/swagger';
import compression from 'fastify-compress';
import fastifyCookie from 'fastify-cookie';
import fastifyCsrf from 'fastify-csrf';
import { fastifyHelmet } from 'fastify-helmet';
import { AppModule } from './app.module';
import { helmetConfig } from './config/helmet.config';
import { swaggerConfig, swaggerCustomConfig } from './config/swagger.config';

async function bootstrap() {
   const app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter({
         ignoreTrailingSlash: true,
         logger: true,
      })
   );
   app.enableCors();
   await app.register(compression);
   await app.register(fastifyHelmet, helmetConfig);
   await app.register(fastifyCookie);
   await app.register(fastifyCsrf);
   app.useGlobalPipes(new ValidationPipe());

   const document = SwaggerModule.createDocument(app, swaggerConfig);
   SwaggerModule.setup('docs', app, document, swaggerCustomConfig);

   await app.listen(Number(process.env.PORT) || 3000, '0.0.0.0');
}
bootstrap();
