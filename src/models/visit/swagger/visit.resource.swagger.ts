import type { ApiResponseOptions } from '@nestjs/swagger/dist/decorators/api-response.decorator';
import type { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export const successVisitResourceSchema: SchemaObject = {
	description: "Visit's information",
	properties: {
		_id: {
			description: "Visit's identifier",
			pattern: '^[0-9a-fA-F]{24}$',
			type: 'string',
		},
		createdAt: {
			description: 'Creation date',
			format: 'date-time',
			type: 'string',
		},
		updatedAt: {
			description: 'Modification date',
			format: 'date-time',
			type: 'string',
		},
		url: {
			description: "Visit's URL identifier",
			pattern: '^[0-9a-fA-F]{24}$',
			type: 'string',
		},
	},
	type: 'object',
};

export const successVisitResourceResponse: ApiResponseOptions = {
	description: 'Successful resource data',
	schema: successVisitResourceSchema,
};
