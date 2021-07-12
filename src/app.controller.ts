import { Controller, Get, Param, Redirect } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
   constructor(private readonly appService: AppService) {}

   @Get()
   @Redirect(process.env.MAIN_REDIRECT_URL)
   // eslint-disable-next-line @typescript-eslint/no-empty-function
   main() {}

   @Get(':shortId')
   @Redirect()
   async redirect(@Param('shortId') shortId: string) {
      const longUrl = await this.appService.getLongUrl(shortId);
      return { url: longUrl };
   }
}
