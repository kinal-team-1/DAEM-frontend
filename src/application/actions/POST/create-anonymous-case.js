import { client } from "../../../config";
import { handleGenericError } from "../handle-generic-error";

/**
 *
 * @param {import("../../../types").AnonymousCase} anonymousCase
 * @returns {Promise<any>}
 * @throws {ClientError | ServerError | FetchError}
 */
export const createAnonymousCase = (anonymousCase) => {
  return client
    .post("anonymous-case", anonymousCase)
    .then((res) => {
      return [res.data.data, res.data.message, res.status];
    })
    .catch(handleGenericError);
};
