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
  const searchParams = new URLSearchParams(params);

  return client
    .get(`/public-case?${searchParams.toString()}`)
    .then(async (res) => {
      return [res.data.data, res.data.message, res.status, res.data.total];
    })
    .catch(handleGenericError);
};
