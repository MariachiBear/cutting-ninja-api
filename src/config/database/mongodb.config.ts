import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';

export const mongodbConfig: MongooseModuleAsyncOptions = {
	useFactory: () => ({
		dbName: process.env.MONGO_DB_NAME,
		uri: process.env.MONGO_DB_URI,
	}),
};
