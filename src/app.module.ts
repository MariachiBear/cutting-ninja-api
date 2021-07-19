import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configModuleConfig } from './config/config-module.config';
import { mongodbConfig } from './config/mongodb.config';
import { cacheProvider } from './config/providers/cache.provider';
import { throttlerProvider } from './config/providers/throttler.provider';
import { throttlerConfig } from './config/throttler.config';
import { UrlModule } from './models/url/url.module';
import { UserModule } from './models/user/user.module';
import { VisitModule } from './models/visit/visit.module';

@Module({
   controllers: [AppController],
   providers: [AppService, cacheProvider, throttlerProvider],
   imports: [
      CacheModule.register(),
      ConfigModule.forRoot(configModuleConfig),
      ThrottlerModule.forRoot(throttlerConfig),
      MongooseModule.forRootAsync(mongodbConfig),
      UrlModule,
      UserModule,
      VisitModule,
   ],
})
export class AppModule {}
