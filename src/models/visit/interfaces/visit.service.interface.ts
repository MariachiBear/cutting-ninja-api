import { UserDocument } from 'src/models/user/schema/user.schema';
import { CreateVisitDTO, UpdateVisitDTO } from 'src/models/visit/dto/visit.dto';
import { VisitDocument } from 'src/models/visit/schemas/visit.schema';

export interface BaseVisitService {
	/**
	 * Gets all the visits from the database.
	 *
	 * @returns {Promise<VisitDocument[]>} List of visits
	 */
	index(): Promise<VisitDocument[]>;

	/**
	 * Gets the information from a specific visit in the database.
	 *
	 * @param {string} visitId Identifier of the visit to search
	 *
	 * @returns {Promise<VisitDocument>} Information of the new visit
	 */
	show(visitId: string): Promise<VisitDocument>;

	/**
	 * Stores a new visit in the database.
	 *
	 * @param {CreateVisitDTO} visitData Information to store in the visit
	 * @param {UserDocument | null} requestUser Possible user trying to save the new visit
	 *
	 * @returns {Promise<VisitDocument>} Information of the visit
	 */
	store(visitData: CreateVisitDTO, requestUser: UserDocument | null): Promise<VisitDocument>;

	/**
	 * Updates the information from a visit in the database.
	 *
	 * @param {string} visitId Identifier of the visit to update
	 * @param {UpdateVisitDTO} visitData Information to update in the visit
	 * @param {UserDocument} requestUser User trying to update the visit information
	 *
	 * @returns {Promise<VisitDocument | null>} Updated information of the visit
	 */
	update(
		visitId: string,
		visitData: UpdateVisitDTO,
		requestUser: UserDocument,
	): Promise<VisitDocument | null>;

	/**
	 * Deletes the visit from the database.
	 *
	 * @param {string} visitId Identifier of the visit to update
	 *
	 * @returns {Promise<VisitDocument | null>} Information of the deleted visit
	 */
	delete(visitId: string): Promise<VisitDocument | null>;

	/**
	 * Deletes all the visits in the database.
	 *
	 * @returns {Promise<MongooseDeleteResponse>} Information and count from the deleted visits
	 */
	deleteAll(): Promise<MongooseDeleteResponse>;

	/**
	 * Finds the visits from a specific url.
	 *
	 * Checks if user that make the request has enough permissions.
	 *
	 * @param {string} urlId Identifier of the url from which search the visits
	 * @param {UserDocument} requestUser  User trying to get the visits from an url
	 *
	 * @returns {Promise<VisitDocument[]>} List of visits
	 */
	indexByUrl(urlId: string, requestUser: UserDocument): Promise<VisitDocument[]>;
}
