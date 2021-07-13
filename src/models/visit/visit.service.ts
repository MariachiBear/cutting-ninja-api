import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { VisitDTO } from './dto/visit.dto';
import { Visit, VisitDocument } from './schemas/visit.schema';

@Injectable()
export class VisitService {
   constructor(@InjectModel(Visit.name) private readonly modelVisit: Model<VisitDocument>) {}

   async index() {
      return await this.modelVisit.find().select('-__v').exec();
   }

   async show(id: string) {
      return await this.modelVisit.findById(id).select('-__v').exec();
   }

   async store(visitData: VisitDTO) {
      const newVisit = await new this.modelVisit({ ...visitData }).save();
      return await this.show(newVisit.id);
   }

   async update(id: string, visitData: VisitDTO) {
      return await this.modelVisit
         .findByIdAndUpdate(id, visitData)
         .exec()
         .then((foundUser) => {
            if (!foundUser) throw new NotFoundException(`${Visit.name} not found`);
            return foundUser;
         });
   }

   async delete(id: string) {
      return await this.modelVisit.findByIdAndDelete(id).exec();
   }

   async deleteAll() {
      return await this.modelVisit.deleteMany({}).exec();
   }
}
