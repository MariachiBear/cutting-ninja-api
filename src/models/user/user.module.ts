import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { dbUser } from 'src/config/database/user.db';
import { JwtStrategy } from 'src/config/strategies/jwt.strategy';
import { LocalStrategy } from 'src/config/strategies/local.strategy';
import { UrlModule } from '../url/url.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
   controllers: [UserController],
   providers: [UserService, JwtStrategy, LocalStrategy],
   exports: [UserService],
   imports: [
      JwtModule.registerAsync({
         useFactory: () => ({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '24h' },
         }),
      }),
      dbUser,
      forwardRef(() => UrlModule),
   ],
})
export class UserModule {}
