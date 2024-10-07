import { client } from "../../../config";
import { handleGenericError } from "../handle-generic-error";

/**
 *
 * @param {Object} queryKey
 * @returns {Promise<any>}
 * @throws {ClientError | ServerError | FetchError}
 */
export const getUserById = ({ queryKey }) => {
  const [, id] = queryKey;

  return client
    .get(`/user/${id}`)
    .then((res) => [res.data.data, res.data.message, res.status])
    .catch(handleGenericError);
};
