import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { cacheProvider } from './config/providers/cache.provider';
import { UrlModule } from './models/url/url.module';

@Module({
   controllers: [AppController],
   providers: [AppService, cacheProvider],
   imports: [
      ConfigModule.forRoot({ isGlobal: true }),
      CacheModule.register(),
      MongooseModule.forRootAsync({
         useFactory: () => ({
            uri: process.env.MONGODB_URI,
            useCreateIndex: true,
            useFindAndModify: false,
            useNewUrlParser: true,
            useUnifiedTopology: true,
         }),
      }),
      UrlModule,
   ],
})
export class AppModule {}
