import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faImages,
  faLocationDot,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useMutation } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { LocationModal } from "./LocationModal";
import { FilesModal } from "./FilesModal";
import { createPublicCase } from "../../../../actions/POST/create-public-case";
import { useAuthService } from "../../../../../services/auth";
import { useLocaleService } from "../../../../../services/locale";
import { Switch } from "../../../../components/Switch";
import { createAnonymousCase } from "../../../../actions/POST/create-anonymous-case";
import { KeyModal } from "./KeyModal";

/**
 * @typedef {Object} CaseFormProps
 * @property {string} className
 */

/**
 * @type React.FC<CaseFormProps>
 * @returns {React.ReactElement}
 */
export function CaseForm({ className }) {
  const { LL } = useLocaleService();
  const { user } = useAuthService();
  const modalRef = /** @type {HTMLElement | null} */ useRef(null);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isFilesModalOpen, setIsFilesModalOpen] = useState(false);
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);
  const anonymousCaseRef = useRef(null);
  const [key, setKey] = useState("");
  const [form, setForm] = useState({
    title: "",
    description: "",
  });
  const [isAnonymousCase, setIsAnoynymousCase] = useState(false);
  const [location, setLocation] = useState(null);
  const [files, setFiles] = useState([]);

  const mutation = useMutation({
    mutationFn: isAnonymousCase ? createAnonymousCase : createPublicCase,
    onSuccess([anonymousCase]) {
      if (isAnonymousCase && !key) {
        setIsKeyModalOpen(true);
        anonymousCaseRef.current = anonymousCase;
      }
    },
  });

  useEffect(() => {
    if (!mutation.isSuccess && !mutation.isError) return;

    setTimeout(() => {
      mutation.reset();
    }, 3000);
  }, [mutation.isSuccess, mutation.isError]);

  // assign the modal element to the ref only once
  useEffect(() => {
    if (!modalRef.current) {
      modalRef.current = document.getElementById("modal");
    }
  }, [location === null]);

  // when success, reset the form
  useEffect(() => {
    if (!mutation.isSuccess) return;

    setForm({
      title: "",
      description: "",
    });
    setLocation(null);
    setFiles([]);
    setKey("");
  }, [mutation.isSuccess]);

  return (
    <>
      <form
        onSubmit={(e) => {
          if (!mutation.isIdle) return;

          e.preventDefault();
          const payload = {
            ...form,
            ...location,
            ...(files.length > 0
              ? { filepaths: files.map((f) => f.path) }
              : null),
            // eslint-disable-next-line no-underscore-dangle
            ...(!isAnonymousCase ? { submitter: user._id } : null),
            ...(isAnonymousCase && key ? { key } : null),
          };
          mutation.mutate(payload);
        }}
        className={`p-4 bg-black/60 flex flex-col gap-3 [&_.border]:border-2 rounded-xl  max-w-full md:min-w-[400px]  ${className}`}
      >
        <input
          type="text"
          placeholder={LL?.PAGES.PUBLISH.PLACEHOLDERS.TITLE()}
          className="px-4 py-2 rounded bg-[transparent] border boder-white outline-none text-white placeholder:text-white"
          value={form.title}
          onChange={(e) => {
            setForm({ ...form, title: e.target.value });
          }}
        />
        {/* <AttachmentInput /> */}
        <textarea
          rows={6}
          placeholder={LL?.PAGES.PUBLISH.PLACEHOLDERS.DESCRIPTION()}
          className="text-white bg-[transparent] border rounded px-4 py-2 placeholder:text-white outline-none"
          value={form.description}
          onChange={(e) => {
            setForm({ ...form, description: e.target.value });
          }}
        />
        <div className="flex gap-5 items-center text-white">
          <Switch
            isChecked={isAnonymousCase}
            handleChange={() => {
              setIsAnoynymousCase(!isAnonymousCase);
            }}
          />
          <span>Caso Anonimo</span>
        </div>
        <input
          data-is-visible={isAnonymousCase || null}
          type="text"
          placeholder="Secret key"
          className="px-4 py-2 w-full min-w-0 rounded bg-[transparent] border boder-white outline-none text-white invisible data-[is-visible]:visible placeholder:text-white"
          value={key}
          onChange={(e) => {
            setKey(e.target.value);
          }}
        />
        <div className="flex gap-2">
          <button
            onClick={() => {
              setIsLocationModalOpen(!isLocationModalOpen);
            }}
            type="button"
            className="grow rounded-xl py-4 px-5 bg-black text-white flex gap-2 justify-center items-center relative"
          >
            <FontAwesomeIcon icon={faLocationDot} />
            <span>{LL?.PAGES.PUBLISH.BUTTONS.LOCATION()}</span>
          </button>
          <button
            type="button"
            className="grow rounded-xl py-4 px-5 bg-black text-white flex gap-2 justify-center items-center relative"
            onClick={() => {
              setIsFilesModalOpen(!isFilesModalOpen);
            }}
          >
            <FontAwesomeIcon icon={faImages} />
            <span>{LL?.PAGES.PUBLISH.BUTTONS.FILES()}</span>
            {files.length > 0 && (
              <span className="absolute size-[30px] bg-red-500 -top-3 -right-3 rounded-full flex justify-center items-center">
                {files.length}
              </span>
            )}
          </button>
        </div>
        <button
          type="submit"
          className="text-xl rounded-xl py-5 px-5 bg-black text-white flex justify-center items-center gap-2"
        >
          {mutation.isIdle && <span>{LL?.PAGES.PUBLISH.BUTTONS.SUBMIT()}</span>}
          {mutation.isPending && (
            <>
              <span>{LL?.PAGES.PUBLISH.BUTTONS.SUBMIT_LOADING()}</span>
              <FontAwesomeIcon className="animate-spin" icon={faSpinner} />
            </>
          )}
          {mutation.isError && (
            <span>{LL?.PAGES.PUBLISH.BUTTONS.SUBMIT_ERROR()}</span>
          )}
          {mutation.isSuccess && (
            <>
              <span>{LL?.PAGES.PUBLISH.BUTTONS.SUBMIT_SUCCESS()}</span>
              <FontAwesomeIcon icon={faCheck} />
            </>
          )}
        </button>
      </form>
      {isLocationModalOpen &&
        createPortal(
          <LocationModal
            outsideClick={() => setIsLocationModalOpen(false)}
            location={location || undefined}
            onLocationSelect={({
              latitude,
              longitude,
              city,
              address,
              country,
            }) => {
              setLocation({
                latitude,
                longitude,
                city,
                address,
                country,
              });
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
            files={files}
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
      {isKeyModalOpen &&
        createPortal(
          <KeyModal
            onSubmit={() => {
              anonymousCaseRef.current = null;
              setIsKeyModalOpen(false);
            }}
            onCancel={() => {
              anonymousCaseRef.current = null;
              setIsKeyModalOpen(false);
            }}
            outsideClick={() => {
              anonymousCaseRef.current = null;
              setIsKeyModalOpen(false);
            }}
            anonymousCase={anonymousCaseRef.current}
          />,
          modalRef.current,
        )}
    </>
  );
}

CaseForm.propTypes = {
  className: PropTypes.string,
};
