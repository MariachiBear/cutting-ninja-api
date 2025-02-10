import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Url } from 'src/models/url/schemas/url.schema';

@Schema({ timestamps: true })
export class Visit {
   @Prop({ ref: Url.name, required: true, type: MongooseSchema.Types.ObjectId })
   url: string;

   @Prop({ type: Boolean, required: true })
   isFromBot: boolean;
}

export type VisitDocument = Visit & Document;

export const VisitSchema = SchemaFactory.createForClass(Visit);
