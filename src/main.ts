import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { validationPipe } from './config/pipes/validation.pipes';

async function bootstrap() {
   const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
   app.useGlobalPipes(validationPipe);
   await app.listen(3000, '0.0.0.0');
}
bootstrap();
