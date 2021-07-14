import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { Roles } from 'src/config/constants/roles.constant';

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

   @IsEnum(Roles, { each: true })
   @IsNotEmpty()
   @IsOptional()
   @IsString()
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

   @IsEnum(Roles, { each: true })
   @IsNotEmpty()
   @IsOptional()
   @IsString()
   role: string;
}
