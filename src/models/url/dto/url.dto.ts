import { IsMongoId, IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class UrlDTO {
   @IsNotEmpty()
   @IsString()
   @IsUrl({ require_protocol: true, require_host: true })
   longUrl: string;

   @IsNotEmpty()
   @IsString()
   @IsOptional()
   @IsMongoId()
   user: string;
}
