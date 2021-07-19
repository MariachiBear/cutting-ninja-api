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
import { Roles } from 'src/config/constants/roles.constant';
import { EnabledRoles } from 'src/config/decorators/roles.decorator';
import { RequestParamsDTO } from 'src/config/dto/request-params.dto';
import { JwtAuthGuard } from 'src/config/guards/jwt-auth.guard';
import { OptionalJwtAuthGuard } from 'src/config/guards/optional-jwt.guard';
import { RolesGuard } from 'src/config/guards/role.guard';
import { UserDocument } from '../user/schema/user.schema';
import { VisitService } from '../visit/visit.service';
import { CreateUrlDTO, UpdateUrlDTO } from './dto/url.dto';
import { UrlService } from './url.service';
@Controller('urls')
export class UrlController {
   constructor(private readonly service: UrlService, private readonly visitService: VisitService) {}

   @Get()
   @UseGuards(JwtAuthGuard, RolesGuard)
   @EnabledRoles(Roles.ADMIN)
   async index() {
      return await this.service.index();
   }

   @Get(':id')
   @UseGuards(JwtAuthGuard, RolesGuard)
   @EnabledRoles(Roles.ADMIN)
   async show(@Param() params: RequestParamsDTO) {
      const id = params.id;
      return await this.service.show(id);
   }

   @Post()
   @UseGuards(OptionalJwtAuthGuard)
   async store(@Body() urlData: CreateUrlDTO, @Request() request) {
      const requestUser: UserDocument | null = request.user;
      return await this.service.store(urlData, requestUser);
   }

   @Put(':id')
   @UseGuards(JwtAuthGuard, RolesGuard)
   @EnabledRoles(Roles.ADMIN, Roles.CREATOR)
   @HttpCode(HttpStatus.NO_CONTENT)
   async update(
      @Param() params: RequestParamsDTO,
      @Body() urlData: UpdateUrlDTO,
      @Request() request
   ) {
      const id = params.id;
      const requestUser: UserDocument = request.user;
      return await this.service.update(id, urlData, requestUser);
   }

   @Delete(':id')
   @UseGuards(JwtAuthGuard, RolesGuard)
   @EnabledRoles(Roles.ADMIN, Roles.CREATOR)
   @HttpCode(HttpStatus.NO_CONTENT)
   async delete(@Param() params: RequestParamsDTO, @Request() request) {
      const id = params.id;
      const requestUser: UserDocument = request.user;
      return await this.service.delete(id, requestUser);
   }

   @Delete()
   @UseGuards(JwtAuthGuard, RolesGuard)
   @EnabledRoles(Roles.ADMIN)
   @HttpCode(HttpStatus.NO_CONTENT)
   async deleteAll() {
      return await this.service.deleteAll();
   }

   @Get(':id/visits')
   @UseGuards(JwtAuthGuard, RolesGuard)
   @EnabledRoles(Roles.ADMIN, Roles.CREATOR)
   async showUrlVisits(@Param() params: RequestParamsDTO, @Request() request) {
      const id = params.id;
      const requestUser: UserDocument = request.user;
      return await this.visitService.indexByUrl(id, requestUser);
   }
}
