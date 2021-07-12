import type { DynamicModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/models/user/schema/user.schema';

export const dbUser: DynamicModule = MongooseModule.forFeature([
   { name: User.name, schema: UserSchema, collection: 'users' },
]);
