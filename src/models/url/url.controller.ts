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
	ApiBearerAuth,
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
import { OptionalJwtAuthGuard } from 'src/config/guards/optional-jwt.guard';
import { RolesGuard } from 'src/config/guards/role.guard';
import { SwaggerErrorDescriptions } from 'src/config/swagger/error.descriptions.swagger';
import { swaggerErrorResponse } from 'src/config/swagger/error.response.swagger';
import { SwaggerSuccessDescriptions } from 'src/config/swagger/success.descriptions.swagger';
import { CreateUrlDTO, TakeUrlDTO, UpdateUrlDTO } from 'src/models/url/dto/url.dto';
import { successUrlCollectionResponse } from 'src/models/url/swagger/url.collection.swagger';
import { successUrlResourceResponse } from 'src/models/url/swagger/url.resource.swagger';
import { UrlService } from 'src/models/url/url.service';
import { UserDocument } from 'src/models/user/schema/user.schema';
import { successVisitCollectionResponse } from 'src/models/visit/swagger/visit.collection.swagger';
import { VisitService } from 'src/models/visit/visit.service';
import { TRequest } from 'src/types/request';

@Controller('urls')
@ApiTags('URLs')
@ApiBearerAuth()
@ApiUnauthorizedResponse({
	description: SwaggerErrorDescriptions.Unauthorized,
	schema: swaggerErrorResponse,
})
@ApiForbiddenResponse({
	description: SwaggerErrorDescriptions.Forbidden,
	schema: swaggerErrorResponse,
})
export class UrlController {
	constructor(
		private readonly service: UrlService,
		private readonly visitService: VisitService,
	) {}

	@Get()
	@UseGuards(JwtAuthGuard, RolesGuard)
	@EnabledRoles(Roles.ADMIN)
	@ApiOkResponse(successUrlCollectionResponse)
	async index() {
		const urlList = await this.service.index();
		return urlList;
	}

	@Get(':id')
	@UseGuards(JwtAuthGuard, RolesGuard)
	@EnabledRoles(Roles.ADMIN)
	@ApiOkResponse(successUrlResourceResponse)
	@ApiNotFoundResponse({
		description: SwaggerErrorDescriptions.NotFound,
		schema: swaggerErrorResponse,
	})
	async show(@Param() params: RequestParamsDTO) {
		const { id } = params;
		const url = await this.service.show(id);
		return url;
	}

	@Post()
	@UseGuards(OptionalJwtAuthGuard)
	@ApiCreatedResponse(successUrlResourceResponse)
	@ApiBadRequestResponse({
		description: SwaggerErrorDescriptions.BadRequest,
		schema: swaggerErrorResponse,
	})
	async store(@Body() urlData: CreateUrlDTO, @Request() request: TRequest) {
		const requestUser = request.user as UserDocument | null;
		const url = await this.service.store(urlData, requestUser);
		return url;
	}

	@Put(':id')
	@UseGuards(JwtAuthGuard, RolesGuard)
	@EnabledRoles(Roles.ADMIN, Roles.CREATOR)
	@HttpCode(HttpStatus.NO_CONTENT)
	@ApiNoContentResponse({ description: SwaggerSuccessDescriptions.NoContent })
	@ApiBadRequestResponse({
		description: SwaggerErrorDescriptions.BadRequest,
		schema: swaggerErrorResponse,
	})
	async update(
		@Param() params: RequestParamsDTO,
		@Body() urlData: UpdateUrlDTO,
		@Request() request: TRequest,
	) {
		const { id } = params;
		const requestUser = request.user as UserDocument;
		const url = await this.service.update(id, urlData, requestUser);
		return url;
	}

	@Put('take')
	@UseGuards(JwtAuthGuard, RolesGuard)
	@EnabledRoles(Roles.ADMIN, Roles.CREATOR)
	@HttpCode(HttpStatus.NO_CONTENT)
	@ApiNoContentResponse({ description: SwaggerSuccessDescriptions.NoContent })
	@ApiBadRequestResponse({
		description: SwaggerErrorDescriptions.BadRequest,
		schema: swaggerErrorResponse,
	})
	async take(@Body() urlData: TakeUrlDTO, @Request() request: TRequest) {
		const requestUser = request.user as UserDocument;
		await this.service.take(urlData, requestUser);
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard, RolesGuard)
	@EnabledRoles(Roles.ADMIN, Roles.CREATOR)
	@HttpCode(HttpStatus.NO_CONTENT)
	@ApiNoContentResponse({ description: SwaggerSuccessDescriptions.NoContent })
	async delete(@Param() params: RequestParamsDTO, @Request() request: TRequest) {
		const { id } = params;
		const requestUser = request.user as UserDocument;
		await this.service.delete(id, requestUser);
	}

	@Delete()
	@UseGuards(JwtAuthGuard, RolesGuard)
	@EnabledRoles(Roles.ADMIN)
	@HttpCode(HttpStatus.NO_CONTENT)
	@ApiNoContentResponse({ description: SwaggerSuccessDescriptions.NoContent })
	async deleteAll() {
		await this.service.deleteAll();
	}

	@Get(':id/visits')
	@UseGuards(JwtAuthGuard, RolesGuard)
	@EnabledRoles(Roles.ADMIN, Roles.CREATOR)
	@ApiOkResponse(successVisitCollectionResponse)
	async showUrlVisits(@Param() params: RequestParamsDTO, @Request() request: TRequest) {
		const { id } = params;
		const requestUser = request.user as UserDocument;
		const visitList = await this.visitService.indexByUrl(id, requestUser);
		return visitList;
	}
}
