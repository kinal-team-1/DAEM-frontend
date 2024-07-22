import { client } from "../../../config";
import { handleGenericError } from "../handle-generic-error";

/**
 * Fetches all anonymous cases from the server.
 *
 * @param {Object} queryKey - Query key used by the query client.
 * @returns {Promise<any>} - Promise resolving to the response data.
 * @throws {ClientError | ServerError | FetchError}
 */
export const getAllAnonymousCases = ({ queryKey }) => {
  const [, { params }] = queryKey;

  return client
    .get(`/anonymous-case?${params.toString()}`)
    .then(async (res) => {
      return [res.data.data, res.data.message, res.status, res.data.total];
    })
    .catch(handleGenericError);
};
