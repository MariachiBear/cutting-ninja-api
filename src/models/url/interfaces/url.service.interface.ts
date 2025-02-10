import { CreateUrlDTO, UpdateUrlDTO } from 'src/models/url/dto/url.dto';
import { UrlDocument } from 'src/models/url/schemas/url.schema';
import { UserDocument } from 'src/models/user/schema/user.schema';

export interface BaseUrlService {
   /**
    * Gets all the urls from the database.
    *
    * @returns {Promise<UrlDocument[]>} List of urls
    */
   index(): Promise<UrlDocument[]>;

   /**
    * Gets the information from a specific url in the database.
    *
    * It throws a `NotFoundException` if no url was found.
    *
    * @param {string} urlId Identifier of the url to search
    *
    * @returns {Promise<UrlDocument>} Information of the url
    */
   show(urlId: string): Promise<UrlDocument>;

   /**
    * Stores a new url in the database.
    *
    * @param {CreateUrlDTO} urlData Information to store in the url
    * @param {UserDocument | null} requestUser Possible user trying to save a new url
    *
    * @returns {Promise<UrlDocument>} Information of the new url
    */
   store(urlData: CreateUrlDTO, requestUser: UserDocument | null): Promise<UrlDocument>;

   /**
    * Updates the information from an url in the database.
    *
    * @param {string} urlId Identifier of the url to update
    * @param {UpdateUrlDTO} urlData Information to update in the url
    * @param {UserDocument} requestUser User trying to update the information of the url
    *
    * @returns {Promise<UrlDocument>} Updated information of the url
    */
   update(urlId: string, urlData: UpdateUrlDTO, requestUser: UserDocument): Promise<UrlDocument>;

   /**
    * Deletes the url from the database.
    *
    * @param {string} urlId Identifier of the url to delete
    * @param {UserDocument} requestUser User trying to delete the url
    *
    * @returns {Promise<UrlDocument>} Information of the deleted url
    */
   delete(urlId: string, requestUser: UserDocument): Promise<UrlDocument>;

   /**
    * Deletes all the urls in the database.
    *
    * @returns {Promise<MongooseDeleteResponse>} Information and count from the deleted urls
    */
   deleteAll(): Promise<MongooseDeleteResponse>;

   /**
    * Increases the visit count from an url in the database, finding it by its short url id.
    *
    * @param {string} shortUrl Identifier of the url to update
    *
    * @returns {Promise<UrlDocument>} Information from the updated url
    */
   increaseVisitCount(shortUrl: string, isFromBot: boolean): Promise<UrlDocument>;

   /**
    * Gets a list of urls that belong to a specific user.
    *
    * @param {string} userId Identifier of the user from which to retrieve the urls
    *
    * @returns {Promise<UrlDocument[]>} List of urls
    */
   indexByUser(userId: string): Promise<UrlDocument[]>;

   /**
    * Check if an user have enough permissions to do specific actions.
    *
    * Current permissions:
    * - User owns the url
    * - User is admin
    *
    * It throws a `UnauthorizedException` if the user has no enough permissions.
    *
    * @param {string} urlId Identifier of the url to update
    * @param {UserDocument} requestUser User trying to do an action with the url information
    *
    * @returns {Promise<UrlDocument>} Information of the url if the action can be performed
    */
   checkUrlPermissions(urlId: string, requestUser: UserDocument): Promise<UrlDocument>;

   /**
    * Gets the information from a specific url in the database by the short url id.
    *
    * It throws a `NotFoundException` if no url was found.
    *
    * @param {string} shortUrlId Identifier of the short url to search
    *
    * @returns {Promise<UrlDocument>} Information of the url
    */
   showByShortUrl(shortUrlId: string): Promise<UrlDocument>;
}
