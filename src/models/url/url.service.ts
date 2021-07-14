import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { nanoid } from 'nanoid';
import { Roles } from 'src/config/constants/roles.constant';
import { UserDocument } from '../user/schema/user.schema';
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

   async store(urlData: UrlDTO, requestUser: UserDocument | null) {
      let shortUrl = nanoid(5);
      let shortUrlCheck = await this.findByShortUrl(shortUrl);

      while (shortUrlCheck.length > 0) {
         shortUrl = nanoid(5);
         shortUrlCheck = await this.findByShortUrl(shortUrl);
      }

      const newUrl = await new this.modelUrl({
         ...urlData,
         shortUrl,
         user: requestUser?._id,
      }).save();

      return await this.show(newUrl.id);
   }

   async update(id: string, urlData: UrlDTO, requestUser: UserDocument) {
      const canDoAction = await this.checkUrlPermissions(id, requestUser);

      if (!canDoAction) throw new UnauthorizedException();

      return await this.modelUrl.findByIdAndUpdate(id, urlData).exec();
   }

   async delete(id: string, requestUser: UserDocument) {
      const canDoAction = await this.checkUrlPermissions(id, requestUser);

      if (!canDoAction) throw new UnauthorizedException();

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
            if (!urlDoc) throw new NotFoundException(`${Url.name} not found`);
            return urlDoc;
         });
   }

   async findByUser(userId: string) {
      return await this.modelUrl.find({ user: userId }).select('-__v').exec();
   }

   private async findByShortUrl(shortUrl: string) {
      return await this.modelUrl.find({ shortUrl }).select('-__v').exec();
   }

   async checkUrlPermissions(urlId: string, requestUser: UserDocument) {
      const urlToCheck = await this.show(urlId);
      const isUserOwningUrl = String(urlToCheck.user) === String(requestUser._id);
      const isUserAdmin = requestUser.role === Roles.ADMIN;
      return isUserOwningUrl || isUserAdmin;
   }
}
