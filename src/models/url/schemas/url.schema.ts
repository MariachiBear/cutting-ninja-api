import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { nanoid } from 'nanoid';

export type URLDocument = URL & Document;

@Schema({ timestamps: true })
export class URL {
   @Prop({ required: true, type: String })
   longURL: string;

   @Prop({ required: true, type: String, default: nanoid(10) })
   shortURL?: string;

   @Prop({ type: Number, required: true, default: 0 })
   visits?: number;
}

export const URLSchema = SchemaFactory.createForClass(URL);
