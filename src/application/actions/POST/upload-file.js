import axios from "axios";
import { client } from "../../../config";
import { handleGenericError } from "../handle-generic-error";

/**
 *
 * @param file
 * @returns {Promise<any>}
 * @throws {ClientError | ServerError | FetchError}
 */
export const uploadFile = (file) => {
  return client
    .post("attachment/upload", { filepath: file.path })
    .then(async (res) => {
      // Idk why they choose to use `PUT`, such a stupid decision
      // cost me hours
      const newRes = await axios.put(res.data.data, file, {
        headers: {
          "Content-Type": file.type,
          Authorization: `Bearer ${res.data.token}`,
        },
      });
      return [newRes.data, res.data.message, res.status];
    })
    .catch(handleGenericError);
};
