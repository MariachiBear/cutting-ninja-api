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
import { Roles } from 'src/config/constants/roles.constant';
import { CreateUserDTO, UpdateUserDTO } from 'src/models/user/dto/user.dto';
import { BaseUserService } from 'src/models/user/interfaces/user.service.interface';
import { User, UserDocument } from 'src/models/user/schema/user.schema';

@Injectable()
export class UserService implements BaseUserService {
	constructor(
		@InjectModel(User.name) private readonly UserModel: Model<UserDocument>,
		private jwtService: JwtService,
	) {
		this.insertDefaultUser().catch(console.error);
	}

	async index() {
		const urlList = await this.UserModel.find().select('-__v -password').exec();

		return urlList;
	}

	async show(userId: string) {
		const url = await this.UserModel.findById(userId)
			.select('-__v -password')
			.exec()
			.then((foundUser) => {
				if (!foundUser) throw new NotFoundException(`${User.name} not found`);
				return foundUser;
			});

		return url;
	}

	async store(userData: CreateUserDTO, requestUser: UserDocument | null) {
		const isRequestUserAdmin = requestUser?.role === Roles.ADMIN;
		const isNewUserAdmin = userData.role === Roles.ADMIN;

		if (!isRequestUserAdmin && isNewUserAdmin) throw new ForbiddenException('Forbidden resource');

		const isAlreadyCreated = await this.UserModel.findOne({ email: userData.email }).exec();

		if (isAlreadyCreated) throw new ConflictException('User already exists');

		const { password, ...userInfo } = userData;

		const saltValue = 10;
		const hashedPassword = await hash(password, saltValue);

		const newUser = await new this.UserModel({ ...userInfo, password: hashedPassword }).save();

		const user = await this.show(String(newUser.id));

		return user;
	}

	async update(userId: string, userData: UpdateUserDTO, requestUser: UserDocument | null) {
		const isRequestUserAdmin = requestUser?.role === Roles.ADMIN;
		const isModifyingRole = !!userData.role;

		if (!isRequestUserAdmin && isModifyingRole)
			throw new ForbiddenException('Forbidden resource');

		if (userData.email) {
			const isAlreadyCreated = await this.UserModel.findOne({
				email: userData.email,
			}).exec();

			if (isAlreadyCreated) throw new ConflictException('User already exists');
		}

		if (userData.password) {
			const { password, ...userInfo } = userData;

			const saltValue = 10;
			const hashedPassword = await hash(password, saltValue);

			const user = await this.UserModel.findByIdAndUpdate(userId, {
				...userInfo,
				password: hashedPassword,
			}).exec();

			return user;
		}

		const user = await this.UserModel.findByIdAndUpdate(userId, userData).exec();

		return user;
	}

	async delete(userId: string) {
		const user = await this.UserModel.findByIdAndDelete(userId).exec();

		return user;
	}

	async deleteAll(): Promise<MongooseDeleteResponse> {
		const deleteDetails = await this.UserModel.deleteMany({}).exec();

		return deleteDetails;
	}

	async signIn(userData: UserDocument) {
		const payload = { email: userData.email, userId: String(userData.id) };
		const accessToken = this.jwtService.sign(payload);

		const user = await this.show(String(userData.id));

		const returnUser: UserWithToken = {
			...user?.toJSON(),
			accessToken,
		};

		return returnUser;
	}

	async validateUser(email: string, password: string) {
		const user = await this.UserModel.findOne({ email }).select('-__v').exec();

		if (!user) throw new NotFoundException(`${User.name} not found`);

		const isValidPassword = await compare(password, user.password);

		if (!isValidPassword) throw new UnauthorizedException();

		return user;
	}

	private async insertDefaultUser() {
		const user: CreateUserDTO = {
			email: 'admin@example.com',
			firstName: 'Admin',
			lastName: 'User',
			password: String(process.env.DEFAULT_USER_PASSWORD),
			role: 'admin',
		};

		const foundUser = await this.UserModel.findOne({ email: user.email }).exec();

		if (foundUser === null) {
			const { password, ...userInfo } = user;
			const saltValue = 10;
			const hashedPassword = await hash(password, saltValue);
			await new this.UserModel({
				...userInfo,
				password: hashedPassword,
			}).save();
		}
	}
}
