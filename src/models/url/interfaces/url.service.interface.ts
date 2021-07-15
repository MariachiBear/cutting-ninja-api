import { UserDocument } from 'src/models/user/schema/user.schema';
import { UrlDTO } from '../dto/url.dto';
import { UrlDocument } from '../schemas/url.schema';

export interface BaseUrlService {
   /**
    * Gets all the disponible urls from a collection
    *
    * @return {(Promise<UrlDocument[]>)} List of urls
    */
   index(): Promise<UrlDocument[]>;

   /**
    * Gets the information from a specific url in a collection
    *
    * @param {string} urlId Identifier of the url to search
    * @return {Promise<UrlDocument>} Information of the new url
    */
   show(urlId: string): Promise<UrlDocument>;

   /**
    * Stores a new url in the database collection
    *
    * @param {UrlDTO} urlData Information to store in the url
    * @param {(UserDocument | null)} requestUser Possible user trying to save the new url
    * @return {(Promise<UrlDocument>)} Information of the url
    */
   store(urlData: UrlDTO, requestUser: UserDocument | null): Promise<UrlDocument>;

   /**
    * Updates the information from an url in the collection
    *
    * @param {string} urlId Identifier of the url to update
    * @param {UrlDTO} urlData Information to update in the url
    * @param {UserDocument} requestUser User trying to update the url information
    * @return {(Promise<UrlDocument>)} Updated information of the url
    */
   update(urlId: string, urlData: UrlDTO, requestUser: UserDocument): Promise<UrlDocument>;

   /**
    * Deletes the url from the collection
    *
    * @param {string} urlId Identifier of the url to update
    * @param {UserDocument} requestUser User trying to update the url information
    * @return {(Promise<UrlDocument>)} Information of the deleted url
    */
   delete(urlId: string, requestUser: UserDocument): Promise<UrlDocument>;

   /**
    * Deletes all the urls in a collection
    *
    * @return {Promise<MongooseDeleteResponse>} Information and count from the deleted urls
    */
   deleteAll(): Promise<MongooseDeleteResponse>;

   /**
    * Increases the visit count from an URL in the collection by it's shortIId
    *
    * @param {string} shortUrL Identifier of the url to update
    * @return {Promise<UrlDocument>} Information from the updated url
    */
   increaseVisitCount(shortUrL: string): Promise<UrlDocument>;

   /**
    * Gets a list of urls that belong to a specific user
    *
    * @param {string} userId Identifier of the user from which to retrieve the urls
    * @return {Promise<UrlDocument[]>} List of urls
    */
   findByUser(userId: string): Promise<UrlDocument[]>;

   /**
    * Check if an user have enough permissions to do specific actions.
    *
    * Current permissions:
    * - User owns the url
    * - User is admin
    *
    * @param {string} urlId Identifier of the url to update
    * @param {UserDocument} requestUser User trying to do an action with the url information
    * @return {Promise<UrlDocument>} Information of the url if the action can be performed
    */
   checkUrlPermissions(urlId: string, requestUser: UserDocument): Promise<UrlDocument>;
}
