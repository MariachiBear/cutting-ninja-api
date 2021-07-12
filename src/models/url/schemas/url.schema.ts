import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UrlDocument = Url & Document;

@Schema({ timestamps: true })
export class Url {
   @Prop({ required: true, type: String })
   longUrl: string;

   @Prop({ required: true, type: String, unique: true })
   shortUrl?: string;

   @Prop({ type: Number, required: true, default: 0 })
   visits: number;
}

export const UrlSchema = SchemaFactory.createForClass(Url);
