import type { ApiResponseOptions } from '@nestjs/swagger/dist/decorators/api-response.decorator';
import type { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { successVisitResourceSchema } from 'src/models/visit/swagger/visit.resource.swagger';

const successVisitCollectionSchema: SchemaObject = {
   description: 'List of Visit',
   items: successVisitResourceSchema,
   type: 'array',
};

export const successVisitCollectionResponse: ApiResponseOptions = {
   description: 'Successful collection data',
   schema: successVisitCollectionSchema,
};
