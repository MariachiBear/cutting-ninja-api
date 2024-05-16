import { ThrottlerOptions } from '@nestjs/throttler';

const requestsByTime = 1000;
const validTimeInSeconds = 60;

export const throttlerConfig: ThrottlerOptions = {
   limit: requestsByTime,
   ttl: validTimeInSeconds,
};
