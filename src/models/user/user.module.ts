import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { dbUser } from 'src/config/database/user.db';
import { JwtStrategy } from 'src/config/strategies/jwt.strategy';
import { LocalStrategy } from 'src/config/strategies/local.strategy';
import { UrlModule } from 'src/models/url/url.module';
import { UserController } from 'src/models/user/user.controller';
import { UserService } from 'src/models/user/user.service';

@Module({
   controllers: [UserController],
   providers: [UserService, JwtStrategy, LocalStrategy],
   exports: [UserService],
   imports: [
      JwtModule.registerAsync({
         useFactory: () => ({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '15 days' },
         }),
      }),
      dbUser,
      UrlModule,
   ],
})
export class UserModule {}
