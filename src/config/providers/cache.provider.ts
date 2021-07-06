import { CacheInterceptor, Provider } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

export const cacheProvider: Provider = { provide: APP_INTERCEPTOR, useClass: CacheInterceptor };
