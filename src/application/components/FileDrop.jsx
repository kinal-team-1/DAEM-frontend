import { useDropzone } from "react-dropzone";
import { useCallback } from "react";
import { faFileUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation } from "@tanstack/react-query";
import { uploadFile } from "../actions/POST/upload-file";

export function FileDrop() {
  const uploadFileMutation = useMutation({
    mutationFn: uploadFile,
    onSuccess: (data) => {
      const [uploadFileResponse, uploadFileMessage, uploadFileStatus] = data;

      console.log({ uploadFileResponse, uploadFileMessage, uploadFileStatus });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    console.log(acceptedFiles);
    uploadFileMutation.mutate(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({ onDrop });

  return (
    <div className="dark:text-silver-300 dark:bg-vulcan-950 hover:bg-silver-300 dark:hover:text-silver-500 dark:hover:bg-vulcan-950/90 p-1 max-w-[200px] rounded cursor-pointer bg-silver-200/50">
      <div
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...getRootProps()}
        className="dark:border-silver-300 border-dashed border-2 p-5 flex flex-col gap-5 "
      >
        <div className="flex justify-center items-center text-9xl">
          <FontAwesomeIcon icon={faFileUpload} />
        </div>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <input {...getInputProps()} />
        <div className="flex flex-col justify-end items-center w-full">
          {isDragActive ? (
            <span>Drop the files here ...</span>
          ) : (
            // eslint-disable-next-line react/no-unescaped-entities
            <p>Drag 'n' drop some files here, or click to select files</p>
          )}
          {acceptedFiles.length > 0 && (
            <div className="w-full pt-3 text-silver-500">
              {acceptedFiles.map((file) => (
                <div key={file.path} className="w-full">
                  <p className="text-nowrap text-ellipsis w-full overflow-hidden text-sm">
                    {file.path}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
