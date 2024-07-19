import { client } from "../../../config";
import { handleGenericError } from "../handle-generic-error";

/**
 *
 * @param {import("../../../types").User} user
 * @returns {Promise<any>}
 * @throws {ClientError | ServerError | FetchError}
 */
export const signup = (user) => {
  return client.post("auth/signup", user).catch(handleGenericError);
};
