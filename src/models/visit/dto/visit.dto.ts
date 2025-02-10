import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsMongoId, isNotEmpty, IsNotEmpty, IsString } from 'class-validator';

export class CreateVisitDTO {
   @IsString()
   @IsNotEmpty()
   @IsMongoId()
   @ApiProperty({
      type: 'string',
      pattern: '^[0-9a-fA-F]{24}$',
      description: 'Reference ID to the URL of the visit (MongoDB ID format)',
   })
   url: string;

   @IsBoolean()
   @ApiProperty({
      type: 'boolean',
      description: 'Defines if the visit was made by a bot or not',
   })
   isFromBot: boolean;
}

export class UpdateVisitDTO extends PartialType(CreateVisitDTO) {}
