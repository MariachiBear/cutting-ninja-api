import type { ApiResponseOptions } from '@nestjs/swagger/dist/decorators/api-response.decorator';
import type { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { successUserResourceSchema } from 'src/models/user/swagger/user.resource.swagger';

const successUserCollectionSchema: SchemaObject = {
   description: 'List of pages',
   items: successUserResourceSchema,
   type: 'array',
};

export const successUserCollectionResponse: ApiResponseOptions = {
   description: 'Successful collection data',
   schema: successUserCollectionSchema,
};
