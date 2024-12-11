import { client } from "../../../config";
import { handleGenericError } from "../handle-generic-error";

/**
 *
 * @returns {Promise<any>}
 * @throws {ClientError | ServerError | FetchError}
 */
export const getContributionsByUserId = ({ queryKey }) => {
  const [, { userId }] = queryKey;
  return client
    .get(`contribution/by-user/${userId}`)
    .then((res) => [res.data.data, res.data.message, res.status])
    .catch(handleGenericError);
};
