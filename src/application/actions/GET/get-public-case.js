import { client } from "../../../config";
import { handleGenericError } from "../handle-generic-error";

/**
 *
 * @param file
 * @returns {Promise<any>}
 * @throws {ClientError | ServerError | FetchError}
 */
export const getPublicCase = ({ queryKey }) => {
  const [, { params }] = queryKey;

  return client
    .get(`/public-case?${params.toString()}`)
    .then(async (res) => {
      return [res.data.data, res.data.message, res.status, res.data.total];
    })
    .catch(handleGenericError);
};
