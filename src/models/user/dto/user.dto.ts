import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { Roles } from 'src/config/constants/roles.constant';

export class CreateUserDTO {
   @IsEmail()
   @IsNotEmpty()
   @IsString()
   email: string;

   @IsNotEmpty()
   @IsString()
   firstName: string;

   @IsNotEmpty()
   @IsString()
   lastName: string;

   @IsNotEmpty()
   @IsString()
   @MinLength(10)
   password: string;

   @IsEnum(Roles, { each: true })
   @IsNotEmpty()
   @IsOptional()
   @IsString()
   role: string;
}

export class UpdateUserDTO extends PartialType(CreateUserDTO) {}
