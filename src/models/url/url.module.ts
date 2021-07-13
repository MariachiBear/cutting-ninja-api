import { forwardRef, Module } from '@nestjs/common';
import { dbUrl } from 'src/config/database/url.db';
import { UserModule } from '../user/user.module';
import { UrlController } from './url.controller';
import { UrlService } from './url.service';

@Module({
   providers: [UrlService],
   controllers: [UrlController],
   exports: [UrlService],
   imports: [dbUrl, forwardRef(() => UserModule)],
})
export class UrlModule {}
