import { Controller, Get, Param, Redirect } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
   constructor(private readonly appService: AppService) {}

   @Get()
   @Redirect()
   main() {
      return { url: process.env.MAIN_REDIRECT_URL };
   }

   @Get(':shortId')
   @Redirect()
   async redirect(@Param('shortId') shortId: string) {
      const longUrl = await this.appService.getLongUrl(shortId);
      return { url: longUrl };
   }
}
