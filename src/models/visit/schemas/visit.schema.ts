import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Url } from 'src/models/url/schemas/url.schema';

export type VisitDocument = Visit & Document;

@Schema({ timestamps: true })
export class Visit {
   @Prop({ ref: Url.name, required: true, type: MongooseSchema.Types.ObjectId })
   url: string;
}

export const VisitSchema = SchemaFactory.createForClass(Visit);
