import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import compression from 'fastify-compress';
import fastifyCookie from 'fastify-cookie';
import fastifyCsrf from 'fastify-csrf';
import { fastifyHelmet } from 'fastify-helmet';
import { AppModule } from './app.module';

async function bootstrap() {
   const app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter({
         ignoreTrailingSlash: true,
         logger: true,
      })
   );
   app.enableCors();
   app.register(compression);
   app.register(fastifyHelmet);
   app.register(fastifyCookie);
   app.register(fastifyCsrf);
   app.useGlobalPipes(new ValidationPipe());
   await app.listen(Number(process.env.PORT) || 3000, '0.0.0.0');
}
bootstrap();
