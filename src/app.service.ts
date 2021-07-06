import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Url, UrlDocument } from './models/url/schemas/url.schema';

@Injectable()
export class AppService {
   constructor(@InjectModel(Url.name) private readonly modelUrl: Model<UrlDocument>) {}

   async getLongUrl(shortid: string) {
      return await this.modelUrl
         .findOneAndUpdate({ shortUrl: shortid }, { $inc: { visits: 1 } })
         .exec()
         .then((urlDoc) => urlDoc?.longUrl);
   }
}
