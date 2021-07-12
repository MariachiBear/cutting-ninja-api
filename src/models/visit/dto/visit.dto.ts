import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class VisitDTO {
   @IsString()
   @IsNotEmpty()
   @IsMongoId()
   url: string;
}
