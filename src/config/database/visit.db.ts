import type { DynamicModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Visit, VisitSchema } from 'src/models/visits/schemas/visit.schema';

export const dbVisit: DynamicModule = MongooseModule.forFeature([
   { name: Visit.name, schema: VisitSchema, collection: 'visits' },
]);
