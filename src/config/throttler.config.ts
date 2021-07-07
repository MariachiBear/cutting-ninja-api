import { ThrottlerModuleOptions } from '@nestjs/throttler';

const requestsByTime = 1000;
const validTimeInSeconds = 60;

export const throttlerConfig: ThrottlerModuleOptions = {
   limit: requestsByTime,
   ttl: validTimeInSeconds,
};
