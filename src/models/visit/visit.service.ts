import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UrlService } from '../url/url.service';
import { UserDocument } from '../user/schema/user.schema';
import { CreateVisitDTO, UpdateVisitDTO } from './dto/visit.dto';
import { BaseVisitService } from './interfaces/visit.service.interface';
import { Visit, VisitDocument } from './schemas/visit.schema';

@Injectable()
export class VisitService implements BaseVisitService {
   constructor(
      @InjectModel(Visit.name) private readonly modelVisit: Model<VisitDocument>,
      private urlService: UrlService
   ) {}

   async index() {
      return await this.modelVisit.find().select('-__v').exec();
   }

   async show(id: string) {
      return await this.modelVisit
         .findById(id)
         .select('-__v')
         .exec()
         .then((foundVisit) => {
            if (!foundVisit) throw new NotFoundException(`${Visit.name} not found`);
            return foundVisit;
         });
   }

   async store(visitData: CreateVisitDTO) {
      await this.urlService.show(visitData.url);
      const newVisit = await new this.modelVisit({ ...visitData }).save();
      return await this.show(newVisit.id);
   }

   async update(id: string, visitData: UpdateVisitDTO) {
      return await this.modelVisit.findByIdAndUpdate(id, visitData).exec();
   }

   async delete(id: string) {
      return await this.modelVisit.findByIdAndDelete(id).exec();
   }

   async deleteAll() {
      return await this.modelVisit.deleteMany({}).exec();
   }

   async indexByUrl(urlId: string, requestUser: UserDocument) {
      const urlToGetVisits = await this.urlService.checkUrlPermissions(urlId, requestUser);

      return await this.modelVisit.find({ url: urlToGetVisits.id }).select('-__v').exec();
   }
}
