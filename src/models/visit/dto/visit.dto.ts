import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateVisitDTO {
   @IsString()
   @IsNotEmpty()
   @IsMongoId()
   @ApiProperty({
      type: 'string',
      pattern: '^/^(0x|0h)?[0-9A-F]+$/i$',
      description: 'Reference ID to the URL of the visit (MongoDB ID format)',
   })
   url: string;
}

export class UpdateVisitDTO extends PartialType(CreateVisitDTO) {}
