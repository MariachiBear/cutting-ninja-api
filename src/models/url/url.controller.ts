import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UrlDTO } from './dto/url.dto';
import { UrlService } from './url.service';
@Controller('url')
export class UrlController {
   constructor(private readonly service: UrlService) {}

   @Get()
   async index() {
      return await this.service.find();
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
   async update(@Param('id') id: string, @Body() urlData: UrlDTO) {
      return await this.service.update(id, urlData);
   }

   @Delete(':id')
   async delete(@Param('id') id: string) {
      return await this.service.delete(id);
   }
}
