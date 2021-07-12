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
import { VisitDTO } from './dto/visit.dto';
import { VisitService } from './visit.service';

@Controller('visits')
export class VisitController {
   constructor(private readonly service: VisitService) {}

   @Get()
   async index() {
      return await this.service.index();
   }

   @Get(':id')
   async find(@Param('id') id: string) {
      return await this.service.show(id);
   }

   @Post()
   async create(@Body() urlData: VisitDTO) {
      return await this.service.store(urlData);
   }

   @Put(':id')
   @HttpCode(HttpStatus.NO_CONTENT)
   async update(@Param('id') id: string, @Body() urlData: VisitDTO) {
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
