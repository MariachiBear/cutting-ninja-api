import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UrlDTO } from './dto/url.dto';
import { Url, UrlDocument } from './schemas/url.schema';

@Injectable()
export class UrlService {
   constructor(@InjectModel(Url.name) private readonly modelUrl: Model<UrlDocument>) {}

   async find() {
      return await this.modelUrl.find().exec();
   }

   async show(id: string) {
      return await this.modelUrl.findById(id).exec();
   }

   async store(urlData: UrlDTO) {
      return await new this.modelUrl({ ...urlData }).save();
   }

   async update(id: string, urlData: UrlDTO) {
      return await this.modelUrl.findByIdAndUpdate(id, urlData).exec();
   }

   async delete(id: string) {
      return await this.modelUrl.findByIdAndDelete(id).exec();
   }
}
