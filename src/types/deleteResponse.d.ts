type MongooseDeleteResponse = { ok?: number | undefined; n?: number | undefined } & {
   deletedCount?: number | undefined;
};
