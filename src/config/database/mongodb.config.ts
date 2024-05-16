import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';

export const mongodbConfig: MongooseModuleAsyncOptions = {
   useFactory: () => ({
      dbName: process.env.MONGODB_DB,
      uri: process.env.MONGODB_URI,
   }),
};
