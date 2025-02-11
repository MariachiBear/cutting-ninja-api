/* eslint-disable max-classes-per-file */
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';
import { UrlDocument } from 'src/models/url/schemas/url.schema';

export class TakeUrlDTO {
	@IsNotEmpty()
	@IsArray()
	@ApiProperty({
		type: 'array',
		items: { type: 'string', pattern: '^[0-9a-fA-F]{24}$' },
		description: "URL's bulk",
	})
	urls: UrlDocument[];
}

export class CreateUrlDTO {
	@IsNotEmpty()
	@IsString()
	@IsUrl({ require_protocol: true, require_host: true })
	@ApiProperty({
		type: 'string',
		format: 'uri',
		description: 'Long url string to short',
		required: true,
	})
	longUrl: string;

	@IsArray()
	@IsOptional()
	@ApiProperty({
		type: 'array',
		items: { type: 'string' },
		description: 'Tags used to group different URLs',
		required: false,
	})
	tags: Array<string>;

	@IsString()
	@IsOptional()
	@ApiProperty({
		type: 'string',
		description: "URL's name",
		required: false,
	})
	name: string;
}

export class UpdateUrlDTO extends PartialType(CreateUrlDTO) {}
