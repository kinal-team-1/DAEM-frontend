import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { FileDrop } from "../../../../components/FileDrop";
import { removeStaleFile } from "../../../../actions/DELETE/remove-stale-file";
import { useLocaleService } from "../../../../../services/locale";

export function FilesModal({
  outsideClick,
  onSubmit,
  onCancel,
  files: filesLoaded,
}) {
  const { LL } = useLocaleService();
  const [files, setFiles] = useState(filesLoaded);
  const newFiles = useRef([]);
  const removeMutation = useMutation({
    mutationFn: removeStaleFile,
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        // remove new files that were not submitted
        if (newFiles.current.length > 0) {
          removeMutation.mutate(newFiles.current);
        }
        onCancel();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="fixed top-0 h-dvh flex justify-center items-center w-full z-20">
      <div
        role="dialog"
        onClick={outsideClick}
        className="bg-black/60 h-full w-full absolute"
      />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(files);
        }}
        className="w-[500px] max-w-[90%] bg-[#1b1a1a] z-10 p-5 flex flex-col gap-5 py-5"
      >
        <div className="text-gray-700 text-5xl">
          <button
            type="button"
            onClick={() => {
              // remove new files that were not submitted
              if (newFiles.current.length > 0) {
                removeMutation.mutate(newFiles.current);
              }
              onCancel();
            }}
          >
            <FontAwesomeIcon icon={faClose} />
          </button>
        </div>
        <div className="px-2 w-full flex flex-col gap-3">
          <FileDrop
            files={files}
            className="w-full"
            onFileAdded={(fileResponse) => {
              setFiles((prevFiles) => [...prevFiles, fileResponse]);
              newFiles.current = [...newFiles.current, fileResponse];
            }}
          />
          <button
            type="submit"
            className="bg-green-400 px-4 py-3 rounded w-full"
          >
            <span>{LL?.PAGES.PUBLISH.BUTTONS.UPLOAD_RESOURCES()}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
