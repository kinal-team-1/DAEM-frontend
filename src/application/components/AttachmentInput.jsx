import { useDropzone } from "react-dropzone";
import { useCallback, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { uploadFile } from "../actions/POST/upload-file";
import { FileRender } from "./FileRender";
import { DynamicTextArea } from "./DynamicTextArea";
import { createContribution } from "../actions/POST/create-contribution";
import { useAuthService } from "../../services/auth";

export function AttachmentInput({ publicCaseId }) {
  const [files, setFiles] = useState([]);
  const [loadedFiles, setLoadedFiles] = useState(new Set());
  const [content, setContent] = useState("");
  const { user } = useAuthService();
  const queryClient = useQueryClient();

  const uploadFileMutation = useMutation({
    mutationFn: uploadFile,
    onSuccess: (data) => {
      const [uploadFileResponse, uploadFileMessage, uploadFileStatus] = data;
    },
    onError: (error) => {
      setFiles((prevFiles) => prevFiles.slice(0, -1));
    },
  });

  const createContributionMutation = useMutation({
    mutationFn: createContribution,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["contribution"],
      });
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

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  // reset the mutation after 3 seconds
  useEffect(() => {
    if (
      !createContributionMutation.isSuccess &&
      !createContributionMutation.isError
    )
      return;

    setTimeout(() => createContributionMutation.reset(), 3000);
  }, [
    createContributionMutation.isSuccess,
    createContributionMutation.isError,
  ]);

  // reset the form when success
  useEffect(() => {
    if (!createContributionMutation.isSuccess) return;

    setContent("");
    setFiles([]);
    setLoadedFiles(new Set());
  }, [createContributionMutation.isSuccess]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!createContributionMutation.isIdle) return;

        const filesToUpload = [...loadedFiles];

        createContributionMutation.mutate({
          content,
          // eslint-disable-next-line no-underscore-dangle
          user_id: user._id,
          case_id: publicCaseId,
          ...(filesToUpload > 0 && { filepaths: filesToUpload }),
        });
      }}
      className="flex flex-col gap-2"
    >
      <div className="border border-white rounded p-2 text-white">
        <div className="w-full flex flex-col gap-2">
          <DynamicTextArea
            value={content}
            setValue={setContent}
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
                    setFiles((prev) =>
                      prev.filter((f) => f.name !== file.name),
                    );
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
      </div>
      <input {...getInputProps()} />
      <div className="flex justify-between gap-2">
        <button
          type="button"
          {...getRootProps()}
          className="rounded-full px-5 py-2 bg-black flex gap-2 items-center"
        >
          <FontAwesomeIcon icon={faPaperclip} />
          <span>Archivos</span>
        </button>
        <button
          type="submit"
          className="rounded-full px-5 py-2 bg-white text-black flex gap-2 items-center"
        >
          <span>APORTAR</span>
        </button>
      </div>
    </form>
  );
}
