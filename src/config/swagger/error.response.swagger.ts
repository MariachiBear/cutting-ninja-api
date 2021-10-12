import type { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export const swaggerErrorResponse: SchemaObject = {
   properties: {
      error: {
         description: 'Description of the error',
         type: 'string',
      },
      message: {
         description: 'Information message',
         oneOf: [
            {
               type: 'string',
            },
            {
               type: 'array',
               items: {
                  type: 'string',
               },
            },
         ],
      },
      statusCode: {
         description: 'HTTP status code of response',
         maximum: 505,
         minimum: 400,
         type: 'integer',
      },
   },
   type: 'object',
};
