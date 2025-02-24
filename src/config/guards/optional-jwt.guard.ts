import { ImATeapotException, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class OptionalJwtAuthGuard extends AuthGuard('jwt') {
	// eslint-disable-next-line class-methods-use-this
	handleRequest(err, user, info) {
		if (err && !info) throw new ImATeapotException();
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		if (user) return user;
		return null;
	}
}
