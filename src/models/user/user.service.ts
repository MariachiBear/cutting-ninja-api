import {
   ConflictException,
   ForbiddenException,
   Injectable,
   NotFoundException,
   UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { compare, hash } from 'bcryptjs';
import { Model } from 'mongoose';
import { CreateUserDTO, UpdateUserDTO } from './dto/user.dto';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UserService {
   constructor(
      @InjectModel(User.name) private readonly modelUser: Model<UserDocument>,
      private jwtService: JwtService
   ) {}

   async index() {
      return await this.modelUser.find().select('-__v -password').exec();
   }

   async show(id: string) {
      return await this.modelUser
         .findById(id)
         .select('-__v -password')
         .exec()
         .then((foundUser) => {
            if (!foundUser) throw new NotFoundException(`${User.name} not found`);
            return foundUser;
         });
   }

   async store(userData: CreateUserDTO, requestUser: UserDocument | null) {
      const isRequestUserAdmin = requestUser?.role === 'admin';
      const isNewUserAdmin = userData.role === 'admin';

      if (!isRequestUserAdmin && isNewUserAdmin)
         throw new ForbiddenException('Forbidden admin user creation');

      const isAlreadyCreated = await this.modelUser.findOne({ email: userData.email }).exec();

      if (isAlreadyCreated) throw new ConflictException('User already exists');

      const { password, ...userInfo } = userData;

      const saltValue = 10;
      const hashedPassword = await hash(password, saltValue);

      const newUser = await new this.modelUser({ ...userInfo, password: hashedPassword }).save();

      return await this.show(newUser.id);
   }

   async update(id: string, userData: UpdateUserDTO, requestUser: UserDocument | null) {
      const isRequestUserAdmin = requestUser?.role === 'admin';
      const isModifyingRole = !!userData.role;

      if (!isRequestUserAdmin && isModifyingRole)
         throw new ForbiddenException('Forbidden user role modification');

      return await this.modelUser.findByIdAndUpdate(id, userData).exec();
   }

   async delete(id: string) {
      return await this.modelUser.findByIdAndDelete(id).exec();
   }

   async deleteAll() {
      return await this.modelUser.deleteMany({}).exec();
   }

   async signIn(userData: UserDocument) {
      const payload = { email: userData.email, id: userData.id };
      const accessToken = this.jwtService.sign(payload);

      const user = await this.show(userData.id);

      return {
         ...user?.toJSON(),
         accessToken,
      };
   }

   async validateUser(email: string, password: string) {
      const user = await this.modelUser.findOne({ email: email }).select('-__v').exec();

      if (!user) throw new NotFoundException('User not found');

      const isValidPassword = await compare(password, user.password);

      if (!isValidPassword) throw new UnauthorizedException();

      return user;
   }
}
