import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { nanoid } from 'nanoid';

export type UrlDocument = Url & Document;

@Schema({ timestamps: true })
export class Url {
   @Prop({ required: true, type: String })
   longUrl: string;

   @Prop({ required: true, type: String, default: nanoid(10) })
   shortUrl?: string;

   @Prop({ type: Number, required: true, default: 0 })
   visits?: number;
}

export const UrlSchema = SchemaFactory.createForClass(Url);
