import PropTypes from "prop-types";

/**
 * @type {React.FC<{ isChecked: boolean, handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void }>}
 */
export function Switch({ isChecked, handleChange }) {
  return (
    <>
      <input
        checked={isChecked}
        onChange={handleChange}
        className="h-0 w-0 invisible group/checkbox"
        id="react-switch-new"
        type="checkbox"
      />
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label
        data-is-checked={isChecked || null}
        className="flex items-center justify-between cursor-pointer w-[70px] h-[30px] bg-gray-200 rounded-[100px] relative transition-[background-color,0.2s] group/label data-[is-checked]:bg-green-400"
        htmlFor="react-switch-new"
      >
        <div
          data-is-checked={isChecked || null}
          className="h-[calc(100%-3px)] aspect-square transition-[0.2s] absolute top-0.5 left-1 data-[is-checked]:left-[calc(100%-2px)]"
        >
          <div
            data-is-checked={isChecked || null}
            className="bg-gray-400 w-full h-full rounded-full shadow  group-active/label:w-[130%] transition-[0.2s] data-[is-checked]:-translate-x-full"
          />
        </div>
      </label>
    </>
  );
}

Switch.propTypes = {
  isChecked: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
};
