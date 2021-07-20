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
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/config/constants/roles.constant';
import { EnabledRoles } from 'src/config/decorators/roles.decorator';
import { RequestParamsDTO } from 'src/config/dto/request-params.dto';
import { OptionalJwtAuthGuard } from 'src/config/guards/optional-jwt.guard';
import { RolesGuard } from 'src/config/guards/role.guard';
import { JwtAuthGuard } from '../../config/guards/jwt-auth.guard';
import { LocalAuthGuard } from '../../config/guards/local-auth.guard';
import { UrlService } from '../url/url.service';
import { CreateUserDTO, UpdateUserDTO } from './dto/user.dto';
import { UserDocument } from './schema/user.schema';
import { UserService } from './user.service';

@Controller('users')
@ApiTags('Users')
export class UserController {
   constructor(private readonly service: UserService, private readonly urlService: UrlService) {}

   @Get()
   @UseGuards(JwtAuthGuard, RolesGuard)
   @EnabledRoles(Roles.ADMIN)
   async index() {
      const userList = await this.service.index();
      return userList;
   }

   @Get(':id')
   @UseGuards(JwtAuthGuard, RolesGuard)
   @EnabledRoles(Roles.ADMIN)
   async show(@Param() params: RequestParamsDTO) {
      const { id } = params;
      const user = await this.service.show(id);
      return user;
   }

   @Post('sign-up')
   @UseGuards(OptionalJwtAuthGuard)
   async store(@Body() userData: CreateUserDTO, @Request() request) {
      const requestUser: UserDocument | null = request.user;
      const user = await this.service.store(userData, requestUser);
      return user;
   }

   @Put(':id')
   @UseGuards(JwtAuthGuard, RolesGuard)
   @HttpCode(HttpStatus.NO_CONTENT)
   @EnabledRoles(Roles.ADMIN)
   async update(
      @Param() params: RequestParamsDTO,
      @Body() userData: UpdateUserDTO,
      @Request() request,
   ) {
      const { id } = params;
      const requestUser: UserDocument = request.user;
      await this.service.update(id, userData, requestUser);
   }

   @Delete(':id')
   @UseGuards(JwtAuthGuard, RolesGuard)
   @EnabledRoles(Roles.ADMIN)
   @HttpCode(HttpStatus.NO_CONTENT)
   async delete(@Param() params: RequestParamsDTO) {
      const { id } = params;
      await this.service.delete(id);
   }

   @Delete()
   @UseGuards(JwtAuthGuard, RolesGuard)
   @EnabledRoles(Roles.ADMIN)
   @HttpCode(HttpStatus.NO_CONTENT)
   async deleteAll() {
      await this.service.deleteAll();
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
      await this.service.update(requestUser._id, userData, requestUser);
   }

   @Get('me/urls')
   @UseGuards(JwtAuthGuard)
   getMyUrls(@Request() request) {
      const requestUser: UserDocument = request.user;
      const urlList = this.urlService.indexByUser(requestUser._id);
      return urlList;
   }
}
