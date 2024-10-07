import emailjs from "@emailjs/browser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faClose,
  faCopy,
  faPaperPlane,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Switch } from "../../../../components/Switch";
import { EMAILJS_PUBLIC_KEY } from "../../../../../config";

const serviceId = "service_y54jrim";
const templateId = "template_c1oyw3b";
export function KeyModal({ outsideClick, onSubmit, onCancel, anonymousCase }) {
  const { key } = anonymousCase;
  const [clipboardStatus, setClipboardStatus] = useState("idle");
  const [emailStatus, setEmailStatus] = useState("idle");
  const [sendByEmail, setSendByEmail] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        // remove new files that were not submitted
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
          onSubmit();
        }}
        className="w-[500px] max-w-[90%] bg-[#1b1a1a] z-10 p-5 flex flex-col gap-5 py-5"
      >
        <div className="text-gray-700 text-5xl">
          <button
            type="button"
            onClick={() => {
              // remove new files that were not submitted
              onCancel();
            }}
          >
            <FontAwesomeIcon icon={faClose} />
          </button>
        </div>
        <div className="px-2 w-full flex flex-col gap-5 text-white">
          <span>
            Tu caso se ha presentado a DAEM, por favor guarda la llave de acceso
            para que puedas darle seguimiento a este mismo caso, si no la
            guardas, podras relacionar este caso hablando con soporte.
          </span>
          <button
            type="button"
            onClick={(e) => {
              //  copy to clipboard
              if (clipboardStatus !== "idle") return;
              e.preventDefault();
              navigator.clipboard.writeText(key);
              setClipboardStatus("success");
              setTimeout(() => {
                setClipboardStatus("idle");
              }, 3000);
            }}
            className="py-3 text-lg min-[400px]:text-xl sm:text-2xl font-bold text-red-600 bg-black px-4 rounded flex justify-between"
          >
            <span>{key}</span>
            <button
              type="button"
              className="text-silver-500/50 hover:text-silver-500"
            >
              {clipboardStatus === "idle" && <FontAwesomeIcon icon={faCopy} />}
              {clipboardStatus === "success" && (
                <FontAwesomeIcon className="text-green-400" icon={faCheck} />
              )}
            </button>
          </button>
          <div className="flex gap-2 items-center">
            <Switch
              isChecked={sendByEmail}
              handleChange={() => {
                setSendByEmail(!sendByEmail);
              }}
            />
            <span>Enviar por correo</span>
          </div>
          <div
            data-is-visible={sendByEmail || null}
            className="flex gap-3 invisible data-[is-visible]:visible"
          >
            <input
              type="email"
              placeholder="Email"
              className="px-4 py-2 min-w-0 grow rounded bg-[transparent] border boder-white outline-none text-white placeholder:text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setEmailStatus("loading");
                emailjs
                  .send(serviceId, templateId, {
                    email,
                    secret_key: key,
                  })
                  .then((e) => {
                    setEmailStatus("success");
                    setEmail("");
                  })
                  .catch((e) => {
                    setEmailStatus("error");
                  })
                  .finally(() => {
                    setTimeout(() => setEmailStatus("idle"), 3000);
                  });
              }}
              className="px-4 border rounded"
            >
              {emailStatus === "idle" && (
                <FontAwesomeIcon icon={faPaperPlane} />
              )}
              {emailStatus === "loading" && (
                <FontAwesomeIcon icon={faSpinner} />
              )}
              {emailStatus === "error" && (
                <FontAwesomeIcon className="text-red-700" icon={faClose} />
              )}
              {emailStatus === "success" && (
                <FontAwesomeIcon className="text-green-400" icon={faCheck} />
              )}
            </button>
          </div>
          <button
            type="submit"
            className="bg-green-400 px-4 py-3 rounded w-full"
          >
            <span>Aceptar</span>
          </button>
        </div>
      </form>
    </div>
  );
}

KeyModal.propTypes = {
  outsideClick: PropTypes.func,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  anonymousCase: PropTypes.shape({
    key: PropTypes.string,
  }),
};
