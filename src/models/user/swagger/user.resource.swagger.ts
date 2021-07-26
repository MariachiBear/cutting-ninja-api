import type { ApiResponseOptions } from '@nestjs/swagger/dist/decorators/api-response.decorator';
import type { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

const baseUserInfo = {
   _id: {
      description: "User's ID",
      format: 'uuid',
      type: 'string',
   },
   createdAt: {
      description: 'Creation date',
      format: 'date-time',
      type: 'string',
   },
   email: {
      description: "User's email",
      format: 'email',
      type: 'string',
   },
   firstName: {
      description: "User's first name",
      type: 'string',
   },
   lastName: {
      description: "User's last name",
      type: 'string',
   },
   role: {
      description: 'Defined role for permissions',
      type: 'string',
   },
   updatedAt: {
      description: 'Modification date',
      format: 'date-time',
      type: 'string',
   },
};

export const successUserResourceSchema: SchemaObject = {
   description: "User's information",
   properties: baseUserInfo,
   type: 'object',
};

export const successUserJWTResourceSchema: SchemaObject = {
   description: "User's information",
   properties: {
      ...baseUserInfo,
      accessToken: {
         description: 'JWT token to perform actions',
         type: 'string',
      },
   },
   type: 'object',
};

export const successUserResourceResponse: ApiResponseOptions = {
   description: 'Successful resource data',
   schema: successUserResourceSchema,
};

export const successUserJWTResourceResponse: ApiResponseOptions = {
   description: 'Successful resource data',
   schema: successUserJWTResourceSchema,
};
