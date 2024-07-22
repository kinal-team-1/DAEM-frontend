import { client } from "../../../config";
import { handleGenericError } from "../handle-generic-error";

/**
 *
 * @param {string} token
 * @returns {Promise<any>}
 * @throws {ClientError | ServerError | FetchError}
 */
export const validateToken = (token) => {
  return client
    .get("auth/token", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => [res.data.data, res.data.message, res.status])
    .catch((error) => {
      if (error.response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        return [];
      }

      throw error;
    })
    .catch(handleGenericError);
};
