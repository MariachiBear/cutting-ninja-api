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
import {
   ApiBadRequestResponse,
   ApiForbiddenResponse,
   ApiNoContentResponse,
   ApiNotFoundResponse,
   ApiTags,
   ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Roles } from 'src/config/constants/roles.constant';
import { EnabledRoles } from 'src/config/decorators/roles.decorator';
import { RequestParamsDTO } from 'src/config/dto/request-params.dto';
import { JwtAuthGuard } from 'src/config/guards/jwt-auth.guard';
import { RolesGuard } from 'src/config/guards/role.guard';
import { SwaggerErrorDescriptions } from 'src/config/swagger/error.descriptions.swagger';
import { swaggerErrorResponse } from 'src/config/swagger/error.response.swagger';
import { SwaggerSuccessDescriptions } from 'src/config/swagger/success.descriptions.swagger';
import { CreateVisitDTO, UpdateVisitDTO } from 'src/models/visit/dto/visit.dto';
import { VisitService } from 'src/models/visit/visit.service';

@Controller('visits')
@ApiTags('Visits')
@ApiUnauthorizedResponse({
   description: SwaggerErrorDescriptions.Unauthorized,
   schema: swaggerErrorResponse,
})
@ApiForbiddenResponse({
   description: SwaggerErrorDescriptions.Forbidden,
   schema: swaggerErrorResponse,
})
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
   @ApiNotFoundResponse({
      description: SwaggerErrorDescriptions.NotFound,
      schema: swaggerErrorResponse,
   })
   async show(@Param() params: RequestParamsDTO) {
      const { id } = params;
      const visit = await this.service.show(id);
      return visit;
   }

   @Post()
   @UseGuards(JwtAuthGuard, RolesGuard)
   @EnabledRoles(Roles.ADMIN)
   @ApiBadRequestResponse({
      description: SwaggerErrorDescriptions.BadRequest,
      schema: swaggerErrorResponse,
   })
   async store(@Body() urlData: CreateVisitDTO) {
      const visit = await this.service.store(urlData);
      return visit;
   }

   @Put(':id')
   @UseGuards(JwtAuthGuard, RolesGuard)
   @EnabledRoles(Roles.ADMIN)
   @HttpCode(HttpStatus.NO_CONTENT)
   @ApiNoContentResponse({ description: SwaggerSuccessDescriptions.NoContent })
   @ApiBadRequestResponse({
      description: SwaggerErrorDescriptions.BadRequest,
      schema: swaggerErrorResponse,
   })
   async update(@Param() params: RequestParamsDTO, @Body() urlData: UpdateVisitDTO) {
      const { id } = params;
      await this.service.update(id, urlData);
   }

   @Delete(':id')
   @UseGuards(JwtAuthGuard, RolesGuard)
   @EnabledRoles(Roles.ADMIN)
   @HttpCode(HttpStatus.NO_CONTENT)
   @ApiNoContentResponse({ description: SwaggerSuccessDescriptions.NoContent })
   async delete(@Param() params: RequestParamsDTO) {
      const { id } = params;
      await this.service.delete(id);
   }

   @Delete()
   @UseGuards(JwtAuthGuard, RolesGuard)
   @EnabledRoles(Roles.ADMIN)
   @HttpCode(HttpStatus.NO_CONTENT)
   @ApiNoContentResponse({ description: SwaggerSuccessDescriptions.NoContent })
   async deleteAll() {
      await this.service.deleteAll();
   }
}
