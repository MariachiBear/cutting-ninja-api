import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { configModuleConfig } from 'src/config/config-module.config';
import { mongodbConfig } from 'src/config/mongodb.config';
import { cacheProvider } from 'src/config/providers/cache.provider';
import { throttlerProvider } from 'src/config/providers/throttler.provider';
import { throttlerConfig } from 'src/config/throttler.config';
import { UrlModule } from 'src/models/url/url.module';
import { UserModule } from 'src/models/user/user.module';
import { VisitModule } from 'src/models/visit/visit.module';

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
