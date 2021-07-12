import { Module } from '@nestjs/common';
import { dbVisit } from 'src/config/database/visit.db';
import { VisitController } from './visit.controller';
import { VisitService } from './visit.service';

@Module({
   controllers: [VisitController],
   exports: [VisitService],
   providers: [VisitService],
   imports: [dbVisit],
})
export class VisitModule {}
