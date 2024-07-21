import { client } from "../../../config";
import { handleGenericError } from "../handle-generic-error";

/**
 *
 * @param {import("../../../types").Contribution} contribution
 * @returns {Promise<any>}
 * @throws {ClientError | ServerError | FetchError}
 */
export const createContribution = (contribution) => {
  return client.post("contribution", contribution).catch(handleGenericError);
};
