import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { LocationModal } from "./LocationModal";
import { FilesModal } from "./FilesModal.jsx";

export function CaseForm({ className }) {
  const modalRef = /** @type {HTMLElement | null} */ useRef(null);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isFilesModalOpen, setIsFilesModalOpen] = useState(false);
  const [coordinates, setCoordinates] = useState(null);
  const [files, setFiles] = useState([]);
  // assign the modal element to the ref only once
  useEffect(() => {
    if (!modalRef.current) {
      modalRef.current = document.getElementById("custom-modal");
    }
  }, [coordinates === null]);

  return (
    <div
      className={`p-4 bg-black/60 flex flex-col gap-3 [&_.border]:border-2 rounded-xl min-w-[400px] ${className}`}
    >
      <input
        type="text"
        placeholder="Titulo..."
        className="px-4 py-2 rounded bg-[transparent] border boder-white outline-none text-white placeholder:text-white"
      />
      {/* <AttachmentInput /> */}
      <textarea
        rows={6}
        placeholder="Descripcion..."
        className="text-white bg-[transparent] border rounded px-4 py-2 placeholder:text-white outline-none"
      />
      <div className="flex gap-2">
        <button
          onClick={() => {
            setIsLocationModalOpen(!isLocationModalOpen);
            setTimeout(() => {
              modalRef.current.removeAllListeners();
            }, 0);
          }}
          type="button"
          className="grow rounded-xl py-4 px-5 bg-black text-white flex gap-2 justify-center items-center"
        >
          <FontAwesomeIcon icon={faLocationDot} />
          <span>Location</span>
        </button>
        <button
          type="button"
          className="grow rounded-xl py-4 px-5 bg-black text-white flex gap-2 justify-center items-center"
          onClick={() => {
            setIsFilesModalOpen(!isFilesModalOpen);
            setTimeout(() => {
              modalRef.current.removeAllListeners();
            }, 0);
          }}
        >
          <FontAwesomeIcon icon={faImages} />
          <span>Files</span>
        </button>
      </div>
      <button
        type="submit"
        className="text-2xl rounded-xl py-5 px-5 bg-black text-white"
      >
        Presentar Caso
      </button>
      {isLocationModalOpen &&
        createPortal(
          <LocationModal
            outsideClick={() => setIsLocationModalOpen(false)}
            onLocationSelect={(c) => {
              setCoordinates(c);
              setIsLocationModalOpen(false);
            }}
            onLocationCancel={() => {
              setIsLocationModalOpen(false);
            }}
          />,
          modalRef.current,
        )}
      {isFilesModalOpen &&
        createPortal(
          <FilesModal
            outsideClick={() => setIsFilesModalOpen(false)}
            onSubmit={(fileList) => {
              setFiles(fileList);
              setIsFilesModalOpen(false);
            }}
            onCancel={() => {
              setIsFilesModalOpen(false);
            }}
          />,
          modalRef.current,
        )}
    </div>
  );
}
