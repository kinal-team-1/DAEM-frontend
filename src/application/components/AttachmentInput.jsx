import { useDropzone } from "react-dropzone";
import { useCallback, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { uploadFile } from "../actions/POST/upload-file";
import { FileRender } from "./FileRender";
import { DynamicTextArea } from "./DynamicTextArea";

export function AttachmentInput() {
  const [files, setFiles] = useState([]);
  const [loadedFiles, setLoadedFiles] = useState(new Set());

  const uploadFileMutation = useMutation({
    mutationFn: uploadFile,
    onSuccess: (data) => {
      const [uploadFileResponse, uploadFileMessage, uploadFileStatus] = data;

      console.log({ uploadFileResponse, uploadFileMessage, uploadFileStatus });
    },
    onError: (error) => {
      console.error(error);
      setFiles((prevFiles) => prevFiles.slice(0, -1));
    },
  });

  const onDrop = useCallback(async (acceptedFiles) => {
    // Do something with the files
    // eslint-disable-next-line no-restricted-syntax
    for (const file of acceptedFiles) {
      // eslint-disable-next-line no-await-in-loop
      uploadFileMutation.mutateAsync(file).then((_) => {
        setLoadedFiles((prev) => new Set(prev.add(file.name)));
      });
      setFiles((prevFiles) => [...prevFiles, file]);
    }
  }, []);

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
  });

  return (
    <div className="border border-white rounded p-2 text-white">
      {/* <p>Hola</p> */}
      <input {...getInputProps()} />
      <div className="w-full flex flex-col gap-2">
        <DynamicTextArea
          rows={4}
          className="w-full p-2 focus:outline-none bg-[inherit]"
          placeholder="hola"
          onPaste={(e) => {
            const { files: pastedFiles } = e.clipboardData;

            // eslint-disable-next-line no-restricted-syntax
            for (const file of pastedFiles) {
              file.path = file.name;
              uploadFileMutation.mutateAsync(file).then((_) => {
                setLoadedFiles((prev) => new Set(prev.add(file.name)));
              });
              setFiles((prevFiles) => [...prevFiles, file]);
            }
          }}
        />
        {files.length > 0 && (
          <div className="flex gap-2">
            {files.map((file) => (
              // render the image
              <FileRender
                file={file}
                key={file.name}
                isLoading={!loadedFiles.has(file.name)}
                onFileDeleted={() => {
                  setFiles((prev) => prev.filter((f) => f.name !== file.name));
                  setLoadedFiles((prev) => {
                    prev.delete(file.name);
                    return new Set(prev);
                  });
                }}
              />
            ))}
          </div>
        )}
      </div>
      <div {...getRootProps()} className="border rounded w-fit">
        <button
          type="button"
          onClick={open}
          className="bg-blue-500 px-2 py-1 rounded"
        >
          <FontAwesomeIcon icon={faPaperclip} />
        </button>
      </div>
    </div>
  );
}
