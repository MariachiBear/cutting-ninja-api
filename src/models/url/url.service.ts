import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { nanoid } from 'nanoid';
import { Roles } from 'src/config/constants/roles.constant';
import { CreateUrlDTO, UpdateUrlDTO } from 'src/models/url/dto/url.dto';
import { BaseUrlService } from 'src/models/url/interfaces/url.service.interface';
import { Url, UrlDocument } from 'src/models/url/schemas/url.schema';
import { UserDocument } from 'src/models/user/schema/user.schema';

@Injectable()
export class UrlService implements BaseUrlService {
   constructor(@InjectModel(Url.name) private readonly UrlModel: Model<UrlDocument>) {}

   async index() {
      const urlList = await this.UrlModel.find().select('-__v').exec();

      return urlList;
   }

   async show(urlId: string) {
      const url = await this.UrlModel.findById(urlId)
         .select('-__v')
         .exec()
         .then((foundUrl) => {
            if (!foundUrl) throw new NotFoundException(`${Url.name} not found`);
            return foundUrl;
         });

      return url;
   }

   async store(urlData: CreateUrlDTO, requestUser: UserDocument | null) {
      const shortUrlId = await this.secureShortUrlId();
      const newUrl = await new this.UrlModel({
         ...urlData,
         shortUrl: shortUrlId,
         user: requestUser?._id,
      }).save();
      const url = await this.show(newUrl.id);

      return url;
   }

   async update(urlId: string, urlData: UpdateUrlDTO, requestUser: UserDocument) {
      const urlToUpdate = await this.checkUrlPermissions(urlId, requestUser);
      await this.UrlModel.findByIdAndUpdate(urlId, urlData).exec();

      return urlToUpdate;
   }

   async delete(urlId: string, requestUser: UserDocument) {
      const urlToDelete = await this.checkUrlPermissions(urlId, requestUser);
      await this.UrlModel.findByIdAndDelete(urlId).exec();

      return urlToDelete;
   }

   async deleteAll() {
      const deleteDetails = await this.UrlModel.deleteMany({}).exec();

      return deleteDetails;
   }

   async increaseVisitCount(shortUrl: string) {
      const url = await this.UrlModel.findOneAndUpdate({ shortUrl }, { $inc: { visits: 1 } })
         .exec()
         .then((urlDoc) => {
            if (!urlDoc) throw new NotFoundException(`${Url.name} not found`);
            return urlDoc;
         });

      return url;
   }

   async indexByUser(userId: string) {
      const urlList = await this.UrlModel.find({ user: userId }).select('-__v').exec();

      return urlList;
   }

   async checkUrlPermissions(urlId: string, requestUser: UserDocument) {
      const urlToCheck = await this.show(urlId);
      const isUserOwningUrl = String(urlToCheck.user) === String(requestUser._id);
      const isUserAdmin = requestUser.role === Roles.ADMIN;
      const canDoAction = isUserOwningUrl || isUserAdmin;

      if (!canDoAction) throw new ForbiddenException('Forbidden resource');
      return urlToCheck;
   }

   async showByShortUrl(shortUrlId: string) {
      const urlList = await this.UrlModel.findOne({ shortUrl: shortUrlId })
         .select('-__v')
         .exec()
         .then((foundUrl) => {
            if (!foundUrl) throw new NotFoundException(`${Url.name} not found`);
            return foundUrl;
         });

      return urlList;
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
      const urlList = await this.UrlModel.find({ shortUrl }).select('-__v').exec();

      return urlList;
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
