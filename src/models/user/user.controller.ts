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
import { Roles } from 'src/config/decorators/roles.decorator';
import { RolesGuard } from 'src/config/guards/role.guard';
import { JwtAuthGuard } from '../../config/guards/jwt-auth.guard';
import { LocalAuthGuard } from '../../config/guards/local-auth.guard';
import { CreateUserDTO, UpdateUserDTO } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
   constructor(private readonly service: UserService) {}

   @Get()
   @UseGuards(JwtAuthGuard, RolesGuard)
   @Roles('admin')
   async index() {
      return await this.service.index();
   }

   @Get(':id')
   @UseGuards(JwtAuthGuard, RolesGuard)
   @Roles('admin')
   async show(@Param('id') id: string) {
      return await this.service.show(id);
   }

   @Post()
   async store(@Body() userData: CreateUserDTO) {
      return await this.service.store(userData);
   }

   @Put(':id')
   @UseGuards(JwtAuthGuard)
   @HttpCode(HttpStatus.NO_CONTENT)
   async update(@Param('id') id: string, @Body() userData: UpdateUserDTO) {
      return await this.service.update(id, userData);
   }

   @Delete(':id')
   @UseGuards(JwtAuthGuard, RolesGuard)
   @Roles('admin')
   @HttpCode(HttpStatus.NO_CONTENT)
   async delete(@Param('id') id: string) {
      return await this.service.delete(id);
   }

   @Delete()
   @UseGuards(JwtAuthGuard, RolesGuard)
   @Roles('admin')
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
