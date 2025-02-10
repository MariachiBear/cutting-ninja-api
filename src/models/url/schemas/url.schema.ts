import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/models/user/schema/user.schema';

@Schema({ _id: false })
class VisitsData {
	@Prop({ type: Number, required: true, default: 0 })
	fromBot: number;

	@Prop({ type: Number, required: true, default: 0 })
	fromUser: number;
}

const VisitsDataSchema = SchemaFactory.createForClass(VisitsData);

@Schema({ timestamps: true })
export class Url {
	@Prop({ required: true, type: String })
	longUrl: string;

	@Prop({ required: true, type: String, unique: true })
	shortUrl: string;

	@Prop({ ref: User.name, required: false, type: MongooseSchema.Types.ObjectId })
	user: string;

	@Prop({ type: VisitsDataSchema, required: true, default: { fromBot: 0, fromUser: 0 } })
	visits: VisitsData;

	@Prop({ type: Date, required: false })
	removedAt: Date;

	@Prop({ type: Array<string>, required: false, default: [] })
	tags: Array<string>;

	@Prop({ type: String, required: false })
	name: string;
}

export type UrlDocument = Url & Document;

export const UrlSchema = SchemaFactory.createForClass(Url);
