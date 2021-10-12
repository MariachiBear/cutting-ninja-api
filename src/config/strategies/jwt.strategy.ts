import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/models/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
   constructor(private userService: UserService) {
      super({
         ignoreExpiration: false,
         jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
         secretOrKey: process.env.JWT_SECRET,
      });
   }

   async validate(payload: JWTPayload) {
      const { userId } = payload;
      const user = await this.userService.show(userId);

      return user;
   }
}
