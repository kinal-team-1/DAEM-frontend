/**
 * @typedef {Object} DAEMToastProps
 * @property {function} [closeToast]
 * @property {Object} [toastProps]
 * @property {number} statusCode
 * @property {string} title
 * @property {string[]?} message
 */

import PropTypes from "prop-types";
import { useState } from "react";

const colors = {
  success: "text-green-500",
  error: "text-red-500",
};

/**
 * @param {DAEMToastProps} props
 */
export function DAEMToast({ toastProps, statusCode, title, message }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpenState = () => {
    setIsOpen((prev) => !prev);
  };

  const { type } = toastProps;

  return (
    <>
      <div
        className={`flex justify-between items-center gap-2 font-bold ${colors[type]} w-full`}
      >
        <h1 className="md:text-xl line-clamp-1">{title}</h1>
        {statusCode ? (
          <div className="md:text-3xl text-2xl w-[3ch] shrink-0">
            {statusCode}
          </div>
        ) : null}
      </div>
      <div className={`flex flex-col ${colors[type]}`}>
        {!isOpen && (
          <>
            {message &&
              message.slice(0, 2).map((msg) => (
                <span key={msg} className="text-xs md:text-base">
                  {msg}
                </span>
              ))}
            {message && message.length > 2 && (
              <button type="button" onClick={toggleOpenState}>
                Show more
              </button>
            )}
          </>
        )}
        {isOpen && (
          <>
            {message &&
              message.map((msg) => (
                <span key={msg} className="text-xs md:text-base">
                  {msg}
                </span>
              ))}
            <button type="button" onClick={toggleOpenState}>
              Show less
            </button>
          </>
        )}
      </div>
    </>
  );
}

DAEMToast.propTypes = {
  statusCode: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.arrayOf(PropTypes.string).isRequired,
};
