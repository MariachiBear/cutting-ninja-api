import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { nanoid } from 'nanoid';
import { UrlDTO } from './dto/url.dto';
import { Url, UrlDocument } from './schemas/url.schema';

@Injectable()
export class UrlService {
   constructor(@InjectModel(Url.name) private readonly modelUrl: Model<UrlDocument>) {}

   async index() {
      return await this.modelUrl.find().select('-__v').exec();
   }

   async show(id: string) {
      return await this.modelUrl
         .findById(id)
         .select('-__v')
         .exec()
         .then((foundUrl) => {
            if (!foundUrl) throw new NotFoundException(`${Url.name} not found`);
            return foundUrl;
         });
   }

   async store(urlData: UrlDTO) {
      const newUrl = await new this.modelUrl({ ...urlData, shortUrl: nanoid(5) }).save();
      return await this.show(newUrl.id);
   }

   async update(id: string, urlData: UrlDTO) {
      return await this.modelUrl.findByIdAndUpdate(id, urlData).exec();
   }

   async delete(id: string) {
      return await this.modelUrl.findByIdAndDelete(id).exec();
   }

   async deleteAll() {
      return await this.modelUrl.deleteMany({}).exec();
   }

   async increaseVisitCount(shortId: string) {
      return await this.modelUrl
         .findOneAndUpdate({ shortUrl: shortId }, { $inc: { visits: 1 } })
         .exec()
         .then((urlDoc) => {
            if (urlDoc) return urlDoc;
            throw new NotFoundException('Shorted URL not found');
         });
   }

   async findByUser(userId: string) {
      return await this.modelUrl.find({ user: userId }).select('-__v').exec();
   }
}
