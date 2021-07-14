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
import { EnabledRoles } from 'src/config/decorators/roles.decorator';
import { OptionalJwtAuthGuard } from 'src/config/guards/optional-jwt.guard';
import { RolesGuard } from 'src/config/guards/role.guard';
import { JwtAuthGuard } from '../../config/guards/jwt-auth.guard';
import { LocalAuthGuard } from '../../config/guards/local-auth.guard';
import { UrlService } from '../url/url.service';
import { CreateUserDTO, UpdateUserDTO } from './dto/user.dto';
import { UserDocument } from './schema/user.schema';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
   constructor(private readonly service: UserService, private readonly urlService: UrlService) {}

   @Get()
   @UseGuards(JwtAuthGuard, RolesGuard)
   @EnabledRoles('admin')
   async index() {
      return await this.service.index();
   }

   @Get(':id')
   @UseGuards(JwtAuthGuard, RolesGuard)
   @EnabledRoles('admin')
   async show(@Param('id') id: string) {
      return await this.service.show(id);
   }

   @Post()
   @UseGuards(OptionalJwtAuthGuard)
   async store(@Body() userData: CreateUserDTO, @Request() request) {
      const requestUser: UserDocument | null = request.user;
      return await this.service.store(userData, requestUser);
   }

   @Put(':id')
   @UseGuards(JwtAuthGuard, RolesGuard)
   @HttpCode(HttpStatus.NO_CONTENT)
   @EnabledRoles('admin')
   async update(@Param('id') id: string, @Body() userData: UpdateUserDTO, @Request() request) {
      const requestUser: UserDocument = request.user;
      return await this.service.update(id, userData, requestUser);
   }

   @Delete(':id')
   @UseGuards(JwtAuthGuard, RolesGuard)
   @EnabledRoles('admin')
   @HttpCode(HttpStatus.NO_CONTENT)
   async delete(@Param('id') id: string) {
      return await this.service.delete(id);
   }

   @Delete()
   @UseGuards(JwtAuthGuard, RolesGuard)
   @EnabledRoles('admin')
   @HttpCode(HttpStatus.NO_CONTENT)
   async deleteAll() {
      return await this.service.deleteAll();
   }

   @Post('sign-in')
   @UseGuards(LocalAuthGuard)
   async signIn(@Request() request) {
      return this.service.signIn(request.user);
   }

   @Get('me')
   @UseGuards(JwtAuthGuard)
   getMe(@Request() request) {
      return request.user;
   }

   @Put('me')
   @UseGuards(JwtAuthGuard)
   @HttpCode(HttpStatus.NO_CONTENT)
   async updateMe(@Body() userData: UpdateUserDTO, @Request() request) {
      const requestUser: UserDocument = request.user;
      return await this.service.update(requestUser._id, userData, requestUser);
   }

   @Get('me/urls')
   @UseGuards(JwtAuthGuard)
   getMyUrls(@Request() request) {
      const requestUser: UserDocument = request.user;
      return this.urlService.findByUser(requestUser._id);
   }
}
