import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateUrlDTO {
   @IsNotEmpty()
   @IsString()
   @IsUrl({ require_protocol: true, require_host: true })
   @ApiProperty({
      type: 'string',
      format: 'uri',
      description: 'Long url string to short',
   })
   longUrl: string;
}

export class UpdateUrlDTO extends PartialType(CreateUrlDTO) {}
