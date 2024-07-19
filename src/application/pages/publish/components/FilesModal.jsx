import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { FileDrop } from "../../../components/FileDrop.jsx";

export function FilesModal({ outsideClick, onSubmit, onCancel }) {
  const [files, setFiles] = useState([]);

  return (
    <div className="fixed top-0 h-dvh flex justify-center items-center w-full z-20">
      <div
        role="dialog"
        onClick={outsideClick}
        onKeyDown={(e) => {
          if (e.key === "Esc") {
            outsideClick(e);
          }
        }}
        className="bg-black/60 h-full w-full absolute"
      />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(files);
        }}
        className="w-[500px] bg-[#1b1a1a] z-10 p-5 flex flex-col gap-5 py-5"
      >
        <div className="text-gray-700 text-5xl">
          <button type="button" onClick={onCancel}>
            <FontAwesomeIcon icon={faClose} />
          </button>
        </div>
        <div className="px-2 w-full flex flex-col gap-3">
          <FileDrop
            className="w-full"
            onFileAdded={(fileResponse) => {
              setFiles((prevFiles) => [...prevFiles, fileResponse]);
            }}
          />
          <button
            type="submit"
            className="bg-green-400 px-4 py-3 rounded w-full"
          >
            <span>Submit</span>
          </button>
        </div>
      </form>
    </div>
  );
}
