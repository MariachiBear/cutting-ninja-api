import { CreateUserDTO, UpdateUserDTO } from 'src/models/user/dto/user.dto';
import { UserDocument } from 'src/models/user/schema/user.schema';

export interface BaseUserService {
   /**
    * Gets all the users from the database.
    *
    * @returns {Promise<UserDocument[]>} List of users
    */
   index(): Promise<UserDocument[]>;

   /**
    * Gets the information from a specific user in the database.
    *
    * It throws a `NotFoundException` if no user was found.
    *
    * @param {string} userId Identifier of the user to search
    * @returns {Promise<UserDocument>} Information of the user
    */
   show(userId: string): Promise<UserDocument>;

   /**
    * Stores a new user in the database.
    *
    * It throws a `UnauthorizedException` if the role of the new user is `admin` and the role from
    * the user performing the action is not.
    *
    * It throws a `ConflictException` if the email of the new user was found in the database.
    *
    * @param {UrlDTO} userData Information to store in the user
    * @param {UserDocument | null} requestUser Possible user trying to save a new user
    *
    * @returns {Promise<UserDocument>} Information of the new user
    */
   store(userData: CreateUserDTO, requestUser: UserDocument | null): Promise<UserDocument>;

   /**
    * Updates the information from an user in the database.
    *
    * It throws a `UnauthorizedException` if the role of the user to modify has changed and the user
    * trying to modify it has no the `admin` role.
    *
    * @param {string} userId Identifier of the user to update
    * @param {UrlDTO} userData Information to update in the user
    * @param {UserDocument} requestUser User trying to update the information of the user
    *
    * @returns {Promise<UserDocument | null>} Updated information of the user
    */
   update(
      userId: string,
      userData: UpdateUserDTO,
      requestUser: UserDocument,
   ): Promise<UserDocument | null>;

   /**
    * Deletes the user from the database.
    *
    * @param {string} userId Identifier of the user to delete
    *
    * @returns {Promise<UserDocument | null>} Information of the deleted user
    */
   delete(userId: string): Promise<UserDocument | null>;

   /**
    * Deletes all the users in the database.
    *
    * @returns {Promise<MongooseDeleteResponse>} Information and count from the deleted users
    */
   deleteAll(): Promise<MongooseDeleteResponse>;

   /**
    * Generates a JWT token based in the user information, so the user can use it to perform actions
    * in the system.
    *
    * @param {UserDocument} userData Information of user to validate
    *
    * @returns {Promise<UserWithToken>} Information of the user with the JWT token
    */
   signIn(userData: UserDocument): Promise<UserWithToken>;

   /**
    * Finds an user by the email and compares its password with the one in the database
    *
    * It throws a `NotFoundException` if no user was found.
    *
    * It throws a `UnauthorizedException` if the password do not match.
    *
    * @param {string} email Email of the user
    * @param {string} password Password of the user
    * @returns {Promise<UserDocument>} Information of the user
    */
   validateUser(email: string, password: string): Promise<UserDocument>;
}
