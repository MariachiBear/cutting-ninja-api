import { Injectable } from '@nestjs/common';
import { UrlService } from './models/url/url.service';
import { VisitService } from './models/visits/visit.service';
@Injectable()
export class AppService {
   constructor(private urlService: UrlService, private visitService: VisitService) {}

   async getLongUrl(shortId: string) {
      const url = await this.urlService.increaseVisitCount(shortId);
      await this.visitService.store({ url: url.id });
      return url.longUrl;
   }
}
