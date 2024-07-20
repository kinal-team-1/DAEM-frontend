import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

export function DynamicTextArea(props) {
  const [value, setValue] = useState("");
  const [isOverflow, setIsOverflow] = useState(false);
  const textareaRef = useRef(null);
  const adjustHeight = () => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
    if (textarea.scrollHeight > 100 && !isOverflow) setIsOverflow(true);

    if (textarea.scrollHeight < 100 && isOverflow) setIsOverflow(false);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
    adjustHeight();
  };

  useEffect(() => {
    adjustHeight();
  }, [value]);

  return (
    <>
      <textarea
        {...props}
        ref={textareaRef}
        // rows={1}
        value={value}
        onChange={handleChange}
        className={`m-0 w-full max-h-[100px] overflow-y-hidden resize-none ${props.className}`}
      />
      {isOverflow && (
        <div className="border-0 border-b-2 border-b-silver-400 my-1" />
      )}
    </>
  );
}

DynamicTextArea.propTypes = {
  // eslint-disable-next-line react/require-default-props
  className: PropTypes.string,
  // eslint-disable-next-line react/require-default-props
  rows: PropTypes.number,
};
