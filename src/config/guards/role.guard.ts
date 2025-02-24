import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private readonly reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		const roles = this.reflector.get<string[]>('roles', context.getHandler());

		if (!roles) return false;

		const request = context.switchToHttp().getRequest<{ user: { role: string } }>();
		const { user } = request;

		return roles.some((role) => role === user.role);
	}
}
