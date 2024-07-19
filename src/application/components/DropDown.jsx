import { useLayoutEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

export function DropDown({ defaultOption, options, onChange }) {
  const [optionSelected, setOptionSelected] = useState(defaultOption);
  const [isOpen, setIsOpen] = useState(false);
  const [elementFocused, setElementFocused] = useState(null);
  const buttonFocused = useRef(null);

  const handleKeyDown = (event) => {
    if (!isOpen && event.key !== "Tab" && event.key !== "Enter") {
      setIsOpen(true);
      setElementFocused(0);
    }
    const filteredOptions = options.filter(
      (option) => option !== optionSelected,
    );

    if (event.key === "Escape") {
      setIsOpen(false);
    }

    if (event.key === "ArrowDown") {
      setElementFocused((prev) => {
        if (prev === options.length - 2) {
          return 0;
        }
        return prev + 1;
      });
    }

    if (event.key === "ArrowUp") {
      setElementFocused((prev) => {
        if (prev === 0) {
          return options.length - 2;
        }
        return prev - 1;
      });
    }

    if (event.key === "Enter") {
      setOptionSelected(filteredOptions[elementFocused]);
      setIsOpen(false);
      onChange(filteredOptions[elementFocused]);
    }

    if (event.key === "Tab") {
      setIsOpen(false);
    }
  };

  // this will happen after the component is rendered
  useLayoutEffect(() => {
    if (buttonFocused.current) {
      buttonFocused.current.focus();
    }
  });

  return (
    <div
      role="presentation"
      className="text-white relative rounded bg-black font-bold flex flex-col justify-center size-[calc(120px/3)]"
      onKeyDown={handleKeyDown}
    >
      <button
        type="button"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        ref={elementFocused === 0 ? buttonFocused : null}
        data-isopen={isOpen || null}
        className="h-full w-full data-[isopen]:hover:dark:bg-vulcan-950 data-[isopen]:outline-none data-[isopen]:focus:dark:bg-vulcan-950 rounded flex gap-1 items-center justify-center"
      >
        <span className="text-start">{optionSelected}</span>
      </button>
      {isOpen && (
        <div className="top-[105%] absolute flex flex-col w-full bg-white dark:bg-vulcan-900 z-10 rounded overflow-none">
          {options
            .filter((option) => option !== optionSelected)
            .map((option, i, arr) =>
              option === optionSelected ? null : (
                <button
                  ref={elementFocused === i ? buttonFocused : null}
                  key={option}
                  onClick={() => {
                    setOptionSelected(option);
                    setIsOpen(false);
                    onChange(option, options);
                  }}
                  data-islast={i === arr.length - 1 || null}
                  type="button"
                  className="w-full size-[calc(120px/3)] hover:dark:bg-vulcan-950 focus:dark:bg-vulcan-950 outline-none text-start data-[islast]:rounded-b flex justify-center items-center"
                >
                  {option}
                </button>
              ),
            )}
        </div>
      )}
    </div>
  );
}

DropDown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  defaultOption: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
