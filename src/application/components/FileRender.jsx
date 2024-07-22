import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useMutation } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { removeStaleFile } from "../actions/DELETE/remove-stale-file";

/**
 * @param {object} props
 * @param {File} props.file
 * @param {boolean} props.isLoading
 * @param {function} props.onFileDeleted
 * @returns {JSX.Element}
 */
export function FileRender({ file, isLoading: isImageLoading, onFileDeleted }) {
  const removeMutation = useMutation({
    mutationFn: removeStaleFile,
    onSuccess: () => {
      onFileDeleted(file);
    },
    onError: (error) => {},
  });

  useEffect(() => {
    if (!removeMutation.isError) return;

    setTimeout(() => {
      removeMutation.reset();
    }, 3 * 1000);
  }, [removeMutation.isError]);

  return (
    <div className="size-[70px] rounded-lg border m-1 relative">
      <button
        type="button"
        onClick={() => {
          if (isImageLoading) return;
          if (!removeMutation.isIdle) return;
          removeMutation.mutate([file]);
        }}
        className="bg-silver-300 rounded absolute -top-2 p-2 -right-2 text-xs hover:bg-silver-400 flex justify-center items-center"
      >
        <div className="absolute">
          {!isImageLoading && removeMutation.isIdle && (
            <FontAwesomeIcon icon={faClose} />
          )}
          {removeMutation.isPending && (
            <div className="border-b-red-400 rounded-full size-[10px] border-vulcan-500 border-2 animate-spin" />
          )}

          {isImageLoading && (
            <div className="border-b-red-400 rounded-full size-[10px] border-vulcan-500 border-2 animate-spin" />
          )}
        </div>
      </button>
      <img
        src={URL.createObjectURL(file)}
        alt={file.name}
        className="object-cover w-full h-full"
      />
    </div>
  );
}

FileRender.propTypes = {
  file: PropTypes.instanceOf(File).isRequired,
  isLoading: PropTypes.bool.isRequired,
  onFileDeleted: PropTypes.func.isRequired,
};
