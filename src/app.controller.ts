import { Controller, Get, HttpCode, HttpStatus, Param, Redirect } from '@nestjs/common';
import { ApiExcludeController, ApiFoundResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from 'src/app.service';
import { RedirectRequestParamsDTO } from 'src/config/dto/request-params.dto';
import { SwaggerSuccessDescriptions } from 'src/config/swagger/success.descriptions.swagger';

@Controller()
@ApiTags('Root')
@ApiExcludeController()
export class AppController {
   constructor(private readonly appService: AppService) {}

   @Get()
   @Redirect()
   @HttpCode(HttpStatus.FOUND)
   @ApiFoundResponse({ description: SwaggerSuccessDescriptions.Found })
   main() {
      return { url: process.env.MAIN_REDIRECT_URL };
   }

   @Get(':shortId')
   @Redirect()
   @HttpCode(HttpStatus.FOUND)
   @ApiFoundResponse({ description: SwaggerSuccessDescriptions.Found })
   async redirect(@Param() params: RedirectRequestParamsDTO) {
      const { shortId } = params;
      const longUrl = await this.appService.getLongUrl(shortId);
      return { url: longUrl };
   }
}
