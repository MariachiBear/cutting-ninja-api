import { Injectable } from '@nestjs/common';
import { UrlService } from './models/url/url.service';
@Injectable()
export class AppService {
   constructor(private urlService: UrlService) {}

   async getLongUrl(shortId: string) {
      return await this.urlService.increaseVisitCount(shortId);
   }
}
