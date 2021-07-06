import { Module } from '@nestjs/common';
import { dbUrl } from 'src/config/database/url.db';
import { UrlController } from './url.controller';
import { UrlService } from './url.service';

@Module({
   providers: [UrlService],
   controllers: [UrlController],
   imports: [dbUrl],
})
export class UrlModule {}
