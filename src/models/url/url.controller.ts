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
} from '@nestjs/common';
import { UrlDTO } from './dto/url.dto';
import { UrlService } from './url.service';
@Controller('url')
export class UrlController {
   constructor(private readonly service: UrlService) {}

   @Get()
   async index() {
      return await this.service.index();
   }

   @Get(':id')
   async find(@Param('id') id: string) {
      return await this.service.show(id);
   }

   @Post()
   async create(@Body() urlData: UrlDTO) {
      return await this.service.store(urlData);
   }

   @Put(':id')
   @HttpCode(HttpStatus.NO_CONTENT)
   async update(@Param('id') id: string, @Body() urlData: UrlDTO) {
      return await this.service.update(id, urlData);
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
}
