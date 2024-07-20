import { client } from "../../../config";
import { handleGenericError } from "../handle-generic-error";

/**
 *
 * @returns {Promise<any>}
 * @throws {ClientError | ServerError | FetchError}
 */
export const editProfile = (profileData) => {
  return client
    .put(`user/${profileData.userId}`, profileData)
    .then((res) => [res.data.data, res.data.message, res.status])
    .catch(handleGenericError);
};
