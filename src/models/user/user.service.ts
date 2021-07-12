import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
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
      return await this.modelUser.findById(id).select('-__v -password').exec();
   }

   async store(userData: CreateUserDTO) {
      const { password, ...userInfo } = userData;

      const saltValue = 10;
      const hashedPassword = await hash(password, saltValue);

      const newUser = await new this.modelUser({ ...userInfo, password: hashedPassword }).save();
      return await this.show(newUser.id);
   }

   async update(id: string, userData: UpdateUserDTO) {
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
      console.log(payload);
      const accessToken = this.jwtService.sign(payload);
      console.log(accessToken);

      return {
         ...userData,
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
