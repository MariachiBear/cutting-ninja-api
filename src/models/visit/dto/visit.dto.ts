import { PartialType } from '@nestjs/mapped-types';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateVisitDTO {
   @IsString()
   @IsNotEmpty()
   @IsMongoId()
   url: string;
}

export class UpdateVisitDTO extends PartialType(CreateVisitDTO) {}
