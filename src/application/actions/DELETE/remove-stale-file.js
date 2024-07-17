import { client } from "../../../config";
import { handleGenericError } from "../handle-generic-error";

export function removeStaleFile(files) {
  return client
    .delete("attachment", {
      data: { filepaths: files.map(({ path }) => path) },
    })
    .then((res) => [res.data.data, res.data.message, res.status])
    .catch(handleGenericError);
}
