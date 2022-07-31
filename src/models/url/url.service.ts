import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import { DateTime } from 'luxon';
import { Model } from 'mongoose';
import { customAlphabet, urlAlphabet } from 'nanoid';
import { Roles } from 'src/config/constants/roles.constant';
import { CreateUrlDTO, TakeUrlDTO, UpdateUrlDTO } from 'src/models/url/dto/url.dto';
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

   async take(urlData: TakeUrlDTO, requestUser: UserDocument) {
      const idArray = urlData.urls.map((url) => String(url._id));
      await this.UrlModel.updateMany({ _id: { $in: idArray } }, { user: requestUser._id }).exec();
   }

   async delete(urlId: string, requestUser: UserDocument) {
      //* TO DELETE FROM SYSTEM
      // const urlToDelete = await this.checkUrlPermissions(urlId, requestUser);
      // await this.UrlModel.findByIdAndDelete(urlId).exec();

      // return urlToDelete;

      //* TO UPDATE removedAt
      const urlToUpdate = await this.checkUrlPermissions(urlId, requestUser);
      await this.UrlModel.findByIdAndUpdate(urlId, { removedAt: new Date() }).exec();

      return urlToUpdate;
   }

   async deleteAll(): Promise<MongooseDeleteResponse> {
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
      const urlList = await this.UrlModel.find({
         user: userId,
         removedAt: { $exists: false },
      })
         .select('-__v -removedAt')
         .exec();

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
      const nanoidUrl = customAlphabet(urlAlphabet, 3);

      let shortUrlId = nanoidUrl();
      let shortUrlCheck = await this.indexByShortUrlId(shortUrlId);

      while (shortUrlCheck.length > 0) {
         shortUrlId = nanoidUrl();
         shortUrlCheck = await this.indexByShortUrlId(shortUrlId);
      }

      return shortUrlId;
   }

   @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
   private async purgeUrls() {
      const lastValidDate = DateTime.now().startOf('day').minus({ days: 90 }).toJSDate();

      const bulkResult = await this.UrlModel.bulkWrite([
         {
            updateOne: {
               filter: {
                  createdAt: { $lt: lastValidDate },
                  removedAt: { $exists: false },
                  user: { $exists: false },
               },
               update: { removedAt: new Date() },
            },
         },
      ]);

      console.log(`Removed ${bulkResult.modifiedCount} urls`);
   }
}
