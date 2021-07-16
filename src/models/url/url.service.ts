import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { nanoid } from 'nanoid';
import { Roles } from 'src/config/constants/roles.constant';
import { UserDocument } from '../user/schema/user.schema';
import { CreateUrlDTO, UpdateUrlDTO } from './dto/url.dto';
import { BaseUrlService } from './interfaces/url.service.interface';
import { Url, UrlDocument } from './schemas/url.schema';

@Injectable()
export class UrlService implements BaseUrlService {
   constructor(@InjectModel(Url.name) private readonly modelUrl: Model<UrlDocument>) {}

   async index() {
      return await this.modelUrl.find().select('-__v').exec();
   }

   async show(urlId: string) {
      return await this.modelUrl
         .findById(urlId)
         .select('-__v')
         .exec()
         .then((foundUrl) => {
            if (!foundUrl) throw new NotFoundException(`${Url.name} not found`);
            return foundUrl;
         });
   }

   async store(urlData: CreateUrlDTO, requestUser: UserDocument | null) {
      const shortUrlId = await this.secureShortUrlId();
      const newUrl = await new this.modelUrl({
         ...urlData,
         shortUrl: shortUrlId,
         user: requestUser?._id,
      }).save();

      return await this.show(newUrl.id);
   }

   async update(urlId: string, urlData: UpdateUrlDTO, requestUser: UserDocument) {
      const urlToUpdate = await this.checkUrlPermissions(urlId, requestUser);
      await this.modelUrl.findByIdAndUpdate(urlId, urlData).exec();

      return urlToUpdate;
   }

   async delete(urlId: string, requestUser: UserDocument) {
      const urlToDelete = await this.checkUrlPermissions(urlId, requestUser);
      await this.modelUrl.findByIdAndDelete(urlId).exec();

      return urlToDelete;
   }

   async deleteAll() {
      return await this.modelUrl.deleteMany({}).exec();
   }

   async increaseVisitCount(shortUrl: string) {
      return await this.modelUrl
         .findOneAndUpdate({ shortUrl }, { $inc: { visits: 1 } })
         .exec()
         .then((urlDoc) => {
            if (!urlDoc) throw new NotFoundException(`${Url.name} not found`);
            return urlDoc;
         });
   }

   async indexByUser(userId: string) {
      return await this.modelUrl.find({ user: userId }).select('-__v').exec();
   }

   async checkUrlPermissions(urlId: string, requestUser: UserDocument) {
      const urlToCheck = await this.show(urlId);
      const isUserOwningUrl = String(urlToCheck.user) === String(requestUser._id);
      const isUserAdmin = requestUser.role === Roles.ADMIN;
      const canDoAction = isUserOwningUrl || isUserAdmin;

      if (!canDoAction) throw new UnauthorizedException();
      return urlToCheck;
   }

   /**
    * Gets a list of urls that belong to a specific user.
    *
    * @private
    * @param {string} shortUrl Short url identifier
    *
    * @returns {Promise<UrlDocument[]>} List of urls
    */
   private async indexByShortUrlId(shortUrl: string): Promise<UrlDocument[]> {
      return await this.modelUrl.find({ shortUrl }).select('-__v').exec();
   }

   /**
    * Generates safely a short URL to use in the system.
    *
    * @private
    * @returns {Promise<string>} Short URL to use
    */
   private async secureShortUrlId(): Promise<string> {
      let shortUrlId = nanoid(5);
      let shortUrlCheck = await this.indexByShortUrlId(shortUrlId);

      while (shortUrlCheck.length > 0) {
         shortUrlId = nanoid(5);
         shortUrlCheck = await this.indexByShortUrlId(shortUrlId);
      }

      return shortUrlId;
   }
}
