/* eslint-disable max-classes-per-file */
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { Roles } from 'src/config/constants/roles.constant';

export class LoginUserDTO {
   @IsEmail()
   @IsNotEmpty()
   @IsString()
   @ApiProperty({
      type: 'string',
      format: 'email',
      description: 'Email of the user',
   })
   email: string;

   @IsNotEmpty()
   @IsString()
   @MinLength(10)
   @ApiProperty({
      type: 'string',
      format: 'password',
      minLength: 10,
      description: 'Password of the user',
   })
   password: string;
}

export class CreateUserDTO {
   @IsEmail()
   @IsNotEmpty()
   @IsString()
   @ApiProperty({
      type: 'string',
      format: 'email',
      description: 'Email of the user',
   })
   email: string;

   @IsNotEmpty()
   @IsString()
   @ApiProperty({
      type: 'string',
      description: 'First name of the user',
   })
   firstName: string;

   @IsNotEmpty()
   @IsString()
   @ApiProperty({
      type: 'string',
      description: 'Last name of the user',
   })
   lastName: string;

   @IsNotEmpty()
   @IsString()
   @MinLength(10)
   @ApiProperty({
      type: 'string',
      format: 'password',
      minLength: 10,
      description: 'Password of the user',
   })
   password: string;

   @IsEnum(Roles, { each: true })
   @IsNotEmpty()
   @IsOptional()
   @IsString()
   @ApiPropertyOptional({
      type: 'string',
      description: 'Role of the user',
      enum: Object.values(Roles),
   })
   role: string;
}

export class UpdateUserDTO extends PartialType(CreateUserDTO) {}
