import { MongooseModuleOptions } from '@nestjs/mongoose';

export const mongodbConfig: MongooseModuleOptions = {
   useFactory: () => ({
      uri: process.env.MONGODB_URI,
      useNewUrlParser: true,
      useUnifiedTopology: true,
   }),
};
