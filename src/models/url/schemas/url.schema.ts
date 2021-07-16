import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/models/user/schema/user.schema';

export type UrlDocument = Url & Document;

@Schema({ timestamps: true })
export class Url {
   @Prop({ required: true, type: String })
   longUrl: string;

   @Prop({ required: true, type: String, unique: true })
   shortUrl: string;

   @Prop({ ref: User.name, required: false, type: MongooseSchema.Types.ObjectId })
   user: string;

   @Prop({ type: Number, required: true, default: 0 })
   visits: number;
}

export const UrlSchema = SchemaFactory.createForClass(Url);
