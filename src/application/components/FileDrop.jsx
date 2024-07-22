import { useDropzone } from "react-dropzone";
import { useCallback, useState } from "react";
import { faClose, faFileUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { uploadFile } from "../actions/POST/upload-file";
import { removeStaleFile } from "../actions/DELETE/remove-stale-file";

/**
 * @typedef {Object} FileDropProps
 * @property {string} className
 * @property {(file: File) => void} onFileAdded
 * @property {File[]} files
 */

/**
 * @type React.FC<FileDropProps>
 * @returns {React.ReactElement}
 */

export function FileDrop({ className, onFileAdded, files: filesLoaded }) {
  const [files, setFiles] = useState(filesLoaded);
  const [loadedFiles, setLoadedFiles] = useState(
    new Set(filesLoaded.map((f) => f.name)),
  );

  const uploadFileMutation = useMutation({
    mutationFn: uploadFile,
    onSuccess: (data, file) => {
      const [uploadFileResponse, uploadFileMessage, uploadFileStatus] = data;
      onFileAdded(file);

      console.log({ uploadFileResponse, uploadFileMessage, uploadFileStatus });
    },
    onError: (error) => {},
  });

  const removeMutation = useMutation({
    mutationFn: removeStaleFile,
    onSuccess: (_, [file]) => {
      setFiles((prev) => prev.filter((f) => f.name !== file.name));
      setLoadedFiles((prev) => {
        prev.delete(file.name);
        return new Set(prev);
      });
      removeMutation.reset();
    },
    onError: (error) => {},
  });

  const onDrop = useCallback(async (acceptedFiles) => {
    // eslint-disable-next-line no-restricted-syntax
    for (const file of acceptedFiles) {
      // eslint-disable-next-line no-await-in-loop
      uploadFileMutation.mutateAsync(file).then((_) => {
        setLoadedFiles((prev) => new Set(prev.add(file.name)));
      });
      setFiles((prevFiles) => [...prevFiles, file]);
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      className={`dark:text-silver-300 dark:bg-vulcan-950 hover:bg-silver-300 dark:hover:text-silver-500 dark:hover:bg-vulcan-950/90 p-1 rounded cursor-pointer bg-silver-200/50 ${className}`}
    >
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
          {files.length > 0 && (
            <div className="w-full pt-3 text-silver-500">
              {files.map((file) => (
                <div key={file.path} className="w-full flex gap-2 items-center">
                  <p className="text-nowrap text-ellipsis w-full overflow-hidden text-sm">
                    {file.path}
                  </p>
                  {!loadedFiles.has(file.name) && (
                    <div className="border-b-red-400 rounded-full size-[10px] border-vulcan-500 border-2 animate-spin" />
                  )}
                  {loadedFiles.has(file.name) && (
                    <button
                      type="button"
                      className="hover:text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!removeMutation.isIdle) return;
                        removeMutation.mutate([file]);
                      }}
                    >
                      <FontAwesomeIcon icon={faClose} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

FileDrop.propTypes = {
  // eslint-disable-next-line react/require-default-props
  className: PropTypes.string,
  onFileAdded: PropTypes.func.isRequired,
  files: PropTypes.arrayOf(PropTypes.shape({})),
};
