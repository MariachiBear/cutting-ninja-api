import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import compression from 'fastify-compress';
import fastifyCookie from 'fastify-cookie';
import fastifyCsrf from 'fastify-csrf';
import { fastifyHelmet } from 'fastify-helmet';
import { AppModule } from './app.module';
import { validationPipe } from './config/pipes/validation.pipes';

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
   app.useGlobalPipes(validationPipe);
   await app.listen(3000, '0.0.0.0');
}
bootstrap();
