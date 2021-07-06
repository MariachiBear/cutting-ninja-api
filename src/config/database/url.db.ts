import type { DynamicModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Url, UrlSchema } from 'src/models/url/schemas/url.schema';

export const dbUrl: DynamicModule = MongooseModule.forFeature([
   { name: Url.name, schema: UrlSchema, collection: 'urls' },
]);
