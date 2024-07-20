import { client } from "../../../config";
import { handleGenericError } from "../handle-generic-error";

/**
 *
 * @returns {Promise<any>}
 * @throws {ClientError | ServerError | FetchError}
 */
export const getPublicCasesByUserId = ({ queryKey }) => {
  const [, { userId }] = queryKey;
  return client
    .get(`public-case/by-user/${userId}`)
    .then((res) => [res.data.data, res.data.message])
    .catch(handleGenericError);
};
