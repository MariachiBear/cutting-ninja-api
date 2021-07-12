import {
   Body,
   Controller,
   Delete,
   Get,
   HttpCode,
   HttpStatus,
   Param,
   Post,
   Put,
   Request,
   UseGuards,
} from '@nestjs/common';
import { CreateUserDTO, UpdateUserDTO } from './dto/user.dto';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
   constructor(private readonly service: UserService) {}

   @Get()
   async index() {
      return await this.service.index();
   }

   @Get(':id')
   async show(@Param('id') id: string) {
      return await this.service.show(id);
   }

   @Post()
   async store(@Body() userData: CreateUserDTO) {
      return await this.service.store(userData);
   }

   @Put(':id')
   @HttpCode(HttpStatus.NO_CONTENT)
   async update(@Param('id') id: string, @Body() userData: UpdateUserDTO) {
      return await this.service.update(id, userData);
   }

   @Delete(':id')
   @HttpCode(HttpStatus.NO_CONTENT)
   async delete(@Param('id') id: string) {
      return await this.service.delete(id);
   }

   @Delete()
   @HttpCode(HttpStatus.NO_CONTENT)
   async deleteAll() {
      return await this.service.deleteAll();
   }

   @Post('sign-in')
   @UseGuards(LocalAuthGuard)
   async signIn(@Request() req) {
      return this.service.signIn(req.user);
   }

   @Get('me')
   @UseGuards(JwtAuthGuard)
   getMe(@Request() req) {
      return req.user;
   }
}
