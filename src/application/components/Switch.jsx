export function Switch({ isChecked, handleChange }) {
  return (
    <>
      <input
        checked={isChecked}
        onChange={handleChange}
        className="h-0 w-0 invisible group"
        id="react-switch-new"
        type="checkbox"
      />
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label
        style={{
          background: isChecked && "red",
        }}
        className="flex items-center justify-between cursor-pointer w-[100px] h-[50px] bg-gray-300 rounded-full relative transition-colors group/label "
        htmlFor="react-switch-new"
      >
        <span className="group-active/label:w-[60px] absolute top-1 left-1 size-[45px] rounded-full transition-all shadow group-checked:right-1 group-checked:-translate-x-full" />
      </label>
    </>
  );
}
