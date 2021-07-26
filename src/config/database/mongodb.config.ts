import { MongooseModuleOptions } from '@nestjs/mongoose';

export const mongodbConfig: MongooseModuleOptions = {
   useFactory: () => ({
      uri: process.env.MONGODB_URI,
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
   }),
};
