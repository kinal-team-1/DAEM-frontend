import { client } from "../../../config";
import { handleGenericError } from "../handle-generic-error";

/**
 *
 * @returns {Promise<any>}
 * @throws {ClientError | ServerError | FetchError}
 */
export const getAttachments = ({ queryKey }) => {
  const [, attachmentId] = queryKey;
  return client
    .get(`attachment/${attachmentId}`)
    .then(async (res) => {
      const signedUrls = res.data.data;
      return [signedUrls, res.data.message, res.status];
    })
    .catch(handleGenericError);
};
