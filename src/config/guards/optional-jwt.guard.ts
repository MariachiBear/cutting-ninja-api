import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class OptionalJwtAuthGuard extends AuthGuard('jwt') {
   // eslint-disable-next-line class-methods-use-this
   handleRequest(err, user, info) {
      console.log(err, user, info);
      if (user) return user;
      return null;
   }
}
