import { UserDocument } from 'src/models/user/schema/user.schema';
import { CreateUserDTO, UpdateUserDTO } from '../dto/user.dto';

export interface BaseUserService {
   /**
    * Gets all the disponible users from a collection
    *
    * @return {(Promise<UserDocument[]>)} List of users
    */
   index(): Promise<UserDocument[]>;

   /**
    * Gets the information from a specific user in a collection
    *
    * @param {string} userId Identifier of the user to search
    * @return {Promise<UserDocument>} Information of the new user
    */
   show(userId: string): Promise<UserDocument>;

   /**
    * Stores a new user in the database collection
    *
    * @param {UrlDTO} userData Information to store in the user
    * @param {(UserDocument | null)} requestUser Possible user trying to save the new user
    * @return {(Promise<UserDocument>)} Information of the user
    */
   store(userData: CreateUserDTO, requestUser: UserDocument | null): Promise<UserDocument>;

   /**
    * Updates the information from an user in the collection
    *
    * @param {string} userId Identifier of the user to update
    * @param {UrlDTO} userData Information to update in the user
    * @param {UserDocument} requestUser User trying to update the user information
    * @return {(Promise<UserDocument>)} Updated information of the user
    */
   update(
      userId: string,
      userData: UpdateUserDTO,
      requestUser: UserDocument
   ): Promise<UserDocument | null>;

   /**
    * Deletes the user from the collection
    *
    * @param {string} userId Identifier of the user to update
    * @return {(Promise<UserDocument>)} Information of the deleted user
    */
   delete(userId: string): Promise<UserDocument | null>;

   /**
    * Deletes all the users in a collection
    *
    * @return {Promise<MongooseDeleteResponse>} Information and count from the deleted users
    */
   deleteAll(): Promise<MongooseDeleteResponse>;

   /**
    * Checks if the user credentials are correct and if so, it generates and returns a JWT token to
    * perform actions along the system
    *
    * @param {UserDocument} userData Information of user to validate
    * @return {Promise<UserWithToken>} Information of the user with the JWT token
    */
   signIn(userData: UserDocument): Promise<UserWithToken>;

   /**
    * Validates email and password of an user
    *
    * @param {string} email Email of the user
    * @param {string} password Password of the user
    * @return {Promise<UserDocument>} Information of the user
    */
   validateUser(email: string, password: string): Promise<UserDocument>;
}
