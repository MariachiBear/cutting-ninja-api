import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class RequestParamsDTO {
   @IsString()
   @IsNotEmpty()
   @IsMongoId()
   @ApiProperty({
      description: 'Item ID',
      type: 'string',
   })
   id: string;
}
