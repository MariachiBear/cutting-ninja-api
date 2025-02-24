import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UrlService } from 'src/models/url/url.service';
import { UserDocument } from 'src/models/user/schema/user.schema';
import { CreateVisitDTO, UpdateVisitDTO } from 'src/models/visit/dto/visit.dto';
import { BaseVisitService } from 'src/models/visit/interfaces/visit.service.interface';
import { Visit, VisitDocument } from 'src/models/visit/schemas/visit.schema';

@Injectable()
export class VisitService implements BaseVisitService {
	constructor(
		@InjectModel(Visit.name) private readonly VisitModel: Model<VisitDocument>,
		private urlService: UrlService,
	) {}

	async index() {
		const visitList = await this.VisitModel.find().select('-__v').exec();

		return visitList;
	}

	async show(id: string) {
		const visit = await this.VisitModel.findById(id)
			.select('-__v')
			.exec()
			.then((foundVisit) => {
				if (!foundVisit) throw new NotFoundException(`${Visit.name} not found`);
				return foundVisit;
			});

		return visit;
	}

	async store(visitData: CreateVisitDTO) {
		await this.urlService.show(visitData.url);
		const newVisit = await new this.VisitModel({ ...visitData }).save();
		const visit = await this.show(String(newVisit._id));

		return visit;
	}

	async update(id: string, visitData: UpdateVisitDTO) {
		const visit = await this.VisitModel.findByIdAndUpdate(id, visitData).exec();

		return visit;
	}

	async delete(id: string) {
		const visit = await this.VisitModel.findByIdAndDelete(id).exec();

		return visit;
	}

	async deleteAll(): Promise<MongooseDeleteResponse> {
		const deleteDetails = await this.VisitModel.deleteMany({}).exec();

		return deleteDetails;
	}

	async indexByUrl(urlId: string, requestUser: UserDocument) {
		const urlToGetVisits = await this.urlService.checkUrlPermissions(urlId, requestUser);

		const visitList = await this.VisitModel.find({ url: urlToGetVisits.id })
			.select('-__v')
			.exec();

		return visitList;
	}
}
