import { client } from "../../../config";
import { handleGenericError } from "../handle-generic-error";

/**
 *
 * @param {import("../../../types").PublicCase} publicCase
 * @returns {Promise<any>}
 * @throws {ClientError | ServerError | FetchError}
 */
export const createPublicCase = (publicCase) => {
  return client
    .post("public-case", publicCase)
    .then((res) => {
      return [res.data.data, res.data.message, res.status];
    })
    .catch(handleGenericError);
};
