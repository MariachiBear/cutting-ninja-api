import { forwardRef, Module } from '@nestjs/common';
import { dbUrl } from 'src/config/database/url.db';
import { UrlController } from 'src/models/url/url.controller';
import { UrlService } from 'src/models/url/url.service';
import { VisitModule } from 'src/models/visit/visit.module';

@Module({
	providers: [UrlService],
	controllers: [UrlController],
	exports: [UrlService],
	imports: [dbUrl, forwardRef(() => VisitModule)],
})
export class UrlModule {}
