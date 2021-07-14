import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UrlService } from '../url/url.service';
import { UserDocument } from '../user/schema/user.schema';
import { VisitDTO } from './dto/visit.dto';
import { Visit, VisitDocument } from './schemas/visit.schema';

@Injectable()
export class VisitService {
   constructor(
      @InjectModel(Visit.name) private readonly modelVisit: Model<VisitDocument>,
      private urlService: UrlService
   ) {}

   async index() {
      return await this.modelVisit.find().select('-__v').exec();
   }

   async show(id: string) {
      return await this.modelVisit.findById(id).select('-__v').exec();
   }

   async store(visitData: VisitDTO) {
      await this.urlService.show(visitData.url);
      const newVisit = await new this.modelVisit({ ...visitData }).save();
      return await this.show(newVisit.id);
   }

   async update(id: string, visitData: VisitDTO) {
      return await this.modelVisit
         .findByIdAndUpdate(id, visitData)
         .exec()
         .then((foundVisit) => {
            if (!foundVisit) throw new NotFoundException(`${Visit.name} not found`);
            return foundVisit;
         });
   }

   async delete(id: string) {
      return await this.modelVisit.findByIdAndDelete(id).exec();
   }

   async deleteAll() {
      return await this.modelVisit.deleteMany({}).exec();
   }

   async findByUrl(urlId: string, requestUser: UserDocument) {
      const canDoAction = await this.urlService.checkUrlPermissions(urlId, requestUser);

      if (!canDoAction) throw new UnauthorizedException();

      return await this.modelVisit.find({ url: urlId }).select('-__v').exec();
   }
}
