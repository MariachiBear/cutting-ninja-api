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
   UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/config/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/config/guards/jwt-auth.guard';
import { RolesGuard } from 'src/config/guards/role.guard';
import { UrlDTO } from './dto/url.dto';
import { UrlService } from './url.service';
@Controller('urls')
export class UrlController {
   constructor(private readonly service: UrlService) {}

   @Get()
   @UseGuards(JwtAuthGuard, RolesGuard)
   @Roles('admin', 'creator')
   async index() {
      return await this.service.index();
   }

   @Get(':id')
   @UseGuards(JwtAuthGuard, RolesGuard)
   @Roles('admin', 'creator')
   async show(@Param('id') id: string) {
      return await this.service.show(id);
   }

   @Post()
   async store(@Body() urlData: UrlDTO) {
      return await this.service.store(urlData);
   }

   @Put(':id')
   @UseGuards(JwtAuthGuard, RolesGuard)
   @Roles('admin', 'creator')
   @HttpCode(HttpStatus.NO_CONTENT)
   async update(@Param('id') id: string, @Body() urlData: UrlDTO) {
      return await this.service.update(id, urlData);
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
}
