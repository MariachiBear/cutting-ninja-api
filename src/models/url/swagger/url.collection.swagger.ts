import type { ApiResponseOptions } from '@nestjs/swagger/dist/decorators/api-response.decorator';
import type { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

const successUrlCollectionSchema: SchemaObject = {
   description: 'List of pages',
   items: {
      properties: {
         _id: {
            description: "Page's ID",
            format: 'uuid',
            type: 'string',
         },
         createdAt: {
            description: 'Creation date',
            format: 'date-time',
            type: 'string',
         },
         fields: {
            description: 'Information of the page',
            properties: {},
            type: 'object',
         },
         site: {
            description: 'Site proprietary of the page',
            format: 'uuid',
            type: 'string',
         },
         updatedAt: {
            description: 'Modification date',
            format: 'date-time',
            type: 'string',
         },
      },
      type: 'object',
   },
   type: 'array',
};

export const successUrlCollectionResponse: ApiResponseOptions = {
   description: '',
   schema: successUrlCollectionSchema,
};
