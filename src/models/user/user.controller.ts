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
import {
   ApiBadRequestResponse,
   ApiCreatedResponse,
   ApiForbiddenResponse,
   ApiNoContentResponse,
   ApiNotFoundResponse,
   ApiOkResponse,
   ApiTags,
   ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Roles } from 'src/config/constants/roles.constant';
import { EnabledRoles } from 'src/config/decorators/roles.decorator';
import { RequestParamsDTO } from 'src/config/dto/request-params.dto';
import { JwtAuthGuard } from 'src/config/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'src/config/guards/local-auth.guard';
import { OptionalJwtAuthGuard } from 'src/config/guards/optional-jwt.guard';
import { RolesGuard } from 'src/config/guards/role.guard';
import { SwaggerErrorDescriptions } from 'src/config/swagger/error.descriptions.swagger';
import { swaggerErrorResponse } from 'src/config/swagger/error.response.swagger';
import { SwaggerSuccessDescriptions } from 'src/config/swagger/success.descriptions.swagger';
import { successUrlCollectionResponse } from 'src/models/url/swagger/url.collection.swagger';
import { UrlService } from 'src/models/url/url.service';
import { CreateUserDTO, UpdateUserDTO } from 'src/models/user/dto/user.dto';
import { UserDocument } from 'src/models/user/schema/user.schema';
import { successUserCollectionResponse } from 'src/models/user/swagger/user.collection.swagger';
import {
   successUserJWTResourceResponse,
   successUserResourceResponse,
} from 'src/models/user/swagger/user.resource.swagger';
import { UserService } from 'src/models/user/user.service';

@Controller('users')
@ApiTags('Users')
@ApiUnauthorizedResponse({
   description: SwaggerErrorDescriptions.Unauthorized,
   schema: swaggerErrorResponse,
})
@ApiForbiddenResponse({
   description: SwaggerErrorDescriptions.Forbidden,
   schema: swaggerErrorResponse,
})
export class UserController {
   constructor(private readonly service: UserService, private readonly urlService: UrlService) {}

   @Get()
   @UseGuards(JwtAuthGuard, RolesGuard)
   @EnabledRoles(Roles.ADMIN)
   @ApiOkResponse(successUserCollectionResponse)
   async index() {
      const userList = await this.service.index();
      return userList;
   }

   @Get(':id')
   @UseGuards(JwtAuthGuard, RolesGuard)
   @EnabledRoles(Roles.ADMIN)
   @ApiOkResponse(successUserResourceResponse)
   @ApiNotFoundResponse({
      description: SwaggerErrorDescriptions.NotFound,
      schema: swaggerErrorResponse,
   })
   async show(@Param() params: RequestParamsDTO) {
      const { id } = params;
      const user = await this.service.show(id);
      return user;
   }

   @Post('sign-up')
   @UseGuards(OptionalJwtAuthGuard)
   @ApiCreatedResponse(successUserResourceResponse)
   @ApiBadRequestResponse({
      description: SwaggerErrorDescriptions.BadRequest,
      schema: swaggerErrorResponse,
   })
   @ApiUnauthorizedResponse()
   @ApiForbiddenResponse()
   async store(@Body() userData: CreateUserDTO, @Request() request) {
      const requestUser: UserDocument | null = request.user;
      const user = await this.service.store(userData, requestUser);
      return user;
   }

   @Put(':id')
   @UseGuards(JwtAuthGuard, RolesGuard)
   @HttpCode(HttpStatus.NO_CONTENT)
   @EnabledRoles(Roles.ADMIN)
   @ApiNoContentResponse({ description: SwaggerSuccessDescriptions.NoContent })
   @ApiBadRequestResponse({
      description: SwaggerErrorDescriptions.BadRequest,
      schema: swaggerErrorResponse,
   })
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

   @Post('sign-in')
   @UseGuards(LocalAuthGuard)
   @HttpCode(HttpStatus.OK)
   @ApiOkResponse(successUserJWTResourceResponse)
   @ApiNotFoundResponse({
      description: SwaggerErrorDescriptions.NotFound,
      schema: swaggerErrorResponse,
   })
   @ApiForbiddenResponse()
   async signIn(@Request() request) {
      return this.service.signIn(request.user);
   }

   @Get('me')
   @UseGuards(JwtAuthGuard)
   @ApiOkResponse(successUserResourceResponse)
   @ApiForbiddenResponse()
   getMe(@Request() request) {
      return request.user;
   }

   @Put('me')
   @UseGuards(JwtAuthGuard)
   @HttpCode(HttpStatus.NO_CONTENT)
   @ApiBadRequestResponse({
      description: SwaggerErrorDescriptions.BadRequest,
      schema: swaggerErrorResponse,
   })
   @ApiForbiddenResponse()
   async updateMe(@Body() userData: UpdateUserDTO, @Request() request) {
      const requestUser: UserDocument = request.user;
      await this.service.update(requestUser._id, userData, requestUser);
   }

   @Get('me/urls')
   @UseGuards(JwtAuthGuard)
   @ApiOkResponse(successUrlCollectionResponse)
   @ApiForbiddenResponse()
   getMyUrls(@Request() request) {
      const requestUser: UserDocument = request.user;
      const urlList = this.urlService.indexByUser(requestUser._id);
      return urlList;
   }
}
