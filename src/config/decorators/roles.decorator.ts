import { SetMetadata } from '@nestjs/common';

export const EnabledRoles = (...roles: string[]) => SetMetadata('roles', roles);
