import { client } from "../../../config";
import { handleGenericError } from "../handle-generic-error";

/**
 *
 * @param {import("../../../types").Contribution} contribution
 * @returns {Promise<any>}
 * @throws {ClientError | ServerError | FetchError}
 */
export const createContribution = (contribution) => {
  return client
    .post("contribution", contribution)
    .then((res) => {
      return [res.data.data, res.data.message, res.status];
    })
    .catch(handleGenericError);
};
