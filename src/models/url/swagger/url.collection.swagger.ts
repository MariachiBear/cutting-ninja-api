import type { ApiResponseOptions } from '@nestjs/swagger/dist/decorators/api-response.decorator';
import type { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { successUrlResourceSchema } from 'src/models/url/swagger/url.resource.swagger';

const successUrlCollectionSchema: SchemaObject = {
   description: 'List of URL',
   items: successUrlResourceSchema,
   type: 'array',
};

export const successUrlCollectionResponse: ApiResponseOptions = {
   description: 'Successful collection data',
   schema: successUrlCollectionSchema,
};
