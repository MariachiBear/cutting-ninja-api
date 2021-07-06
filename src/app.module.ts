import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dbUrl } from './config/database/url.db';
import { UrlModule } from './models/url/url.module';

@Module({
   controllers: [AppController],
   providers: [AppService],
   imports: [
      ConfigModule.forRoot({
         isGlobal: true,
      }),
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
      dbUrl,
   ],
})
export class AppModule {}
