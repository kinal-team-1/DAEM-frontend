import { client } from "../../../config";
import { handleGenericError } from "../handle-generic-error";

/**
 *
 * @param {import("../../../types").PublicCase} publicCase
 * @returns {Promise<any>}
 * @throws {ClientError | ServerError | FetchError}
 */
export const createPublicCase = (publicCase) => {
  return client.post("public-case", publicCase).catch(handleGenericError);
};
