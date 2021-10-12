import { MongooseModuleOptions } from '@nestjs/mongoose';

export const mongodbConfig: MongooseModuleOptions = {
   useFactory: () => ({
      dbName: process.env.MONGODB_DB,
      uri: process.env.MONGODB_URI,
      useNewUrlParser: true,
      useUnifiedTopology: true,
   }),
};
