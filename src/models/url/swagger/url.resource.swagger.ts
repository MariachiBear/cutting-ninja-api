import type { ApiResponseOptions } from '@nestjs/swagger/dist/decorators/api-response.decorator';
import type { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export const successUrlResourceSchema: SchemaObject = {
	description: "URL's information",
	properties: {
		_id: {
			description: "URL's Identifier",
			pattern: '^[0-9a-fA-F]{24}$',
			type: 'string',
		},
		createdAt: {
			description: 'Creation date',
			format: 'date-time',
			type: 'string',
		},
		longUrl: {
			description: 'URL where to redirect',
			type: 'string',
		},
		name: {
			description: 'Name for the URL',
			type: 'string',
		},
		shortUrl: {
			description: 'URL short identifier to use',
			type: 'string',
		},
		tags: {
			description: 'Tags used to group different URLs',
			type: 'array',
			items: { type: 'string' },
		},
		updatedAt: {
			description: 'Modification date',
			format: 'date-time',
			type: 'string',
		},
		visits: {
			description: 'Number of times an url was visited',
			type: 'integer',
		},
	},
	type: 'object',
};

export const successUrlResourceResponse: ApiResponseOptions = {
	description: 'Successful resource data',
	schema: successUrlResourceSchema,
};
