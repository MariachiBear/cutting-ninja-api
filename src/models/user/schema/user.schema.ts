import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Roles } from 'src/config/constants/roles.constant';

export type UserDocument = User & Document;

@Schema({ timestamps: true, id: true })
export class User {
   @Prop({ required: true, type: String, unique: true })
   email: string;

   @Prop({ required: true, type: String })
   firstName: string;

   @Prop({ required: true, type: String })
   lastName: string;

   @Prop({ required: true, type: String })
   password: string;

   @Prop({ enum: Object.values(Roles), required: true, type: String, default: Roles.CREATOR })
   role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
