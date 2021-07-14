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
import { JwtAuthGuard } from 'src/config/guards/jwt-auth.guard';
import { OptionalJwtAuthGuard } from 'src/config/guards/optional-jwt.guard';
import { RolesGuard } from 'src/config/guards/role.guard';
import { UserDocument } from '../user/schema/user.schema';
import { UrlDTO } from './dto/url.dto';
import { UrlService } from './url.service';
@Controller('urls')
export class UrlController {
   constructor(private readonly service: UrlService) {}

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
   @UseGuards(OptionalJwtAuthGuard)
   async store(@Body() urlData: UrlDTO, @Request() request) {
      const requestUser: UserDocument | null = request.user;
      return await this.service.store(urlData, requestUser);
   }

   @Put(':id')
   @UseGuards(JwtAuthGuard, RolesGuard)
   @Roles('admin', 'creator')
   @HttpCode(HttpStatus.NO_CONTENT)
   async update(@Param('id') id: string, @Body() urlData: UrlDTO, @Request() request) {
      const requestUser: UserDocument = request.user;
      return await this.service.update(id, urlData, requestUser);
   }

   @Delete(':id')
   @UseGuards(JwtAuthGuard, RolesGuard)
   @Roles('admin', 'creator')
   @HttpCode(HttpStatus.NO_CONTENT)
   async delete(@Param('id') id: string, @Request() request) {
      const requestUser: UserDocument = request.user;
      return await this.service.delete(id, requestUser);
   }

   @Delete()
   @UseGuards(JwtAuthGuard, RolesGuard)
   @Roles('admin')
   @HttpCode(HttpStatus.NO_CONTENT)
   async deleteAll() {
      return await this.service.deleteAll();
   }
}
