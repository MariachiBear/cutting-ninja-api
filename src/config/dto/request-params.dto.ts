import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class RequestParamsDTO {
   @IsString()
   @IsNotEmpty()
   @IsMongoId()
   id: string;
}
