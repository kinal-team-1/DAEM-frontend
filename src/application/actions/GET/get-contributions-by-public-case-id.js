import { client } from "../../../config";
import { handleGenericError } from "../handle-generic-error";

/**
 *
 * @param {Object} queryKey
 * @returns {Promise<any>}
 * @throws {ClientError | ServerError | FetchError}
 */
export const getContributionsByPublicCaseId = ({ queryKey }) => {
  const [, { publicCase }] = queryKey;

  console.log({ publicCase });
  return client
    .get(`/contribution/by-public-case/${publicCase}`)
    .then((res) => [res.data.data, res.data.message, res.status])
    .catch(handleGenericError);
};
