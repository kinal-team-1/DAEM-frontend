import { client } from "../../../config";
import { handleGenericError } from "../handle-generic-error";

/**
 *
 * @param {Object} queryKey
 * @returns {Promise<any>}
 * @throws {ClientError | ServerError | FetchError}
 */
export const getPublicCaseById = ({ queryKey }) => {
  const [, { id, locale }] = queryKey;

  return client
    .get(`public-case/${id}`, {
      headers: {
        "Accept-Language": locale,
      },
    })
    .then((res) => [res.data.data, res.data.message, res.status])
    .catch(handleGenericError);
};
