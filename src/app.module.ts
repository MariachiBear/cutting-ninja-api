import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { mongodbConfig } from './config/mongodb.config';
import { cacheProvider } from './config/providers/cache.provider';
import { throttlerProvider } from './config/providers/throttler.provider';
import { throttlerConfig } from './config/throttler.config';
import { UrlModule } from './models/url/url.module';
import { VisitModule } from './models/visits/visit.module';

@Module({
   controllers: [AppController],
   providers: [AppService, cacheProvider, throttlerProvider],
   imports: [
      CacheModule.register(),
      ConfigModule.forRoot({ isGlobal: true }),
      ThrottlerModule.forRoot(throttlerConfig),
      MongooseModule.forRootAsync(mongodbConfig),
      UrlModule,
      VisitModule,
   ],
})
export class AppModule {}
