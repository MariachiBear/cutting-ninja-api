import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateUrlDTO {
   @IsNotEmpty()
   @IsString()
   @IsUrl({ require_protocol: true, require_host: true })
   longUrl: string;
}

export class UpdateUrlDTO extends PartialType(CreateUrlDTO) {}
