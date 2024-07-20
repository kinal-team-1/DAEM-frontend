import { client } from "../../../config";
import { handleGenericError } from "../handle-generic-error";

/**
 *
 * @param {import("../../../types").Credentials} credentials
 * @returns {Promise<any>}
 * @throws {ClientError | ServerError | FetchError}
 */
export const login = (credentials) => {
  return client
    .post("auth/login", credentials)
    .then((res) => [
      res.data.data,
      res.data.message,
      res.status,
      res.data.token,
    ])
    .catch(handleGenericError);
};
