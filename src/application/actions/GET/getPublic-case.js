import { client } from "../../../config";
import { handleGenericError } from "../handle-generic-error";

/**
 *
 * @param file
 * @returns {Promise<any>}
 * @throws {ClientError | ServerError | FetchError}
 */
export const getPublicCase = () => {
  return client
    .get("/public-case")
    .then(async (res) => {
      return [res.data, res.data.message, res.status];
    })
    .catch(handleGenericError);
};
