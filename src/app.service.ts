import { Injectable } from '@nestjs/common';
import { UrlService } from './models/url/url.service';
import { VisitService } from './models/visit/visit.service';
@Injectable()
export class AppService {
   constructor(private urlService: UrlService, private visitService: VisitService) {}

   /**
    * Finds the url record in the database. Creates a new `Visit` record and then increases the
    * visit count for the found url. After that it retrieves the long url to redirect the client
    *
    * @param {string} shortUrlId
    * @returns {string} Long url to redirect
    */
   async getLongUrl(shortUrlId: string) {
      const urlToRedirect = await this.urlService.showByShortUrl(shortUrlId);
      await this.visitService.store({ url: urlToRedirect.id });
      await this.urlService.increaseVisitCount(shortUrlId);
      return urlToRedirect.longUrl;
   }
}
