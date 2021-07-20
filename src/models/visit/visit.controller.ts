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
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/config/constants/roles.constant';
import { EnabledRoles } from 'src/config/decorators/roles.decorator';
import { RequestParamsDTO } from 'src/config/dto/request-params.dto';
import { JwtAuthGuard } from 'src/config/guards/jwt-auth.guard';
import { RolesGuard } from 'src/config/guards/role.guard';
import { CreateVisitDTO, UpdateVisitDTO } from './dto/visit.dto';
import { VisitService } from './visit.service';

@Controller('visits')
@ApiTags('Visits')
export class VisitController {
   constructor(private readonly service: VisitService) {}

   @Get()
   @UseGuards(JwtAuthGuard, RolesGuard)
   @EnabledRoles(Roles.ADMIN, Roles.CREATOR)
   async index() {
      const visitList = await this.service.index();
      return visitList;
   }

   @Get(':id')
   @UseGuards(JwtAuthGuard, RolesGuard)
   @EnabledRoles(Roles.ADMIN)
   async find(@Param() params: RequestParamsDTO) {
      const { id } = params;
      const visit = await this.service.show(id);
      return visit;
   }

   @Post()
   @UseGuards(JwtAuthGuard, RolesGuard)
   @EnabledRoles(Roles.ADMIN)
   async store(@Body() urlData: CreateVisitDTO) {
      const visit = await this.service.store(urlData);
      return visit;
   }

   @Put(':id')
   @UseGuards(JwtAuthGuard, RolesGuard)
   @EnabledRoles(Roles.ADMIN)
   @HttpCode(HttpStatus.NO_CONTENT)
   async update(@Param() params: RequestParamsDTO, @Body() urlData: UpdateVisitDTO) {
      const { id } = params;
      await this.service.update(id, urlData);
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
}
