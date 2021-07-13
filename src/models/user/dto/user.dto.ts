import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDTO {
   @IsEmail()
   @IsNotEmpty()
   @IsString()
   email: string;

   @IsNotEmpty()
   @IsString()
   @MinLength(10)
   password: string;

   @IsNotEmpty()
   @IsString()
   firstName: string;

   @IsNotEmpty()
   @IsString()
   lastName: string;

   @IsNotEmpty()
   @IsString()
   @IsOptional()
   role: string;
}

export class UpdateUserDTO {
   @IsEmail()
   @IsNotEmpty()
   @IsOptional()
   @IsString()
   email: string;

   @IsNotEmpty()
   @IsOptional()
   @IsString()
   @MinLength(10)
   password: string;

   @IsNotEmpty()
   @IsOptional()
   @IsString()
   firstName: string;

   @IsNotEmpty()
   @IsOptional()
   @IsString()
   lastName: string;

   @IsNotEmpty()
   @IsOptional()
   @IsString()
   role: string;
}
