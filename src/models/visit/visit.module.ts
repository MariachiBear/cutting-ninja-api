import { forwardRef, Module } from '@nestjs/common';
import { dbVisit } from 'src/config/database/visit.db';
import { UrlModule } from '../url/url.module';
import { VisitController } from './visit.controller';
import { VisitService } from './visit.service';

@Module({
	controllers: [VisitController],
	exports: [VisitService],
	providers: [VisitService],
	imports: [dbVisit, forwardRef(() => UrlModule)],
})
export class VisitModule {}
