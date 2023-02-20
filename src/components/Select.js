import { useMemo } from "react";

const Select = ({ titleProp, data, disabled = false, onChange = () => {}}) => {
  const options = useMemo(
    () =>
      data.map((input) => (
        <option key={input?.id} value={input?.id}>
          {input?.name}
        </option>
      )),
    [data]
  );

  return (
    <div className="col-span-1 flex flex-col">
      <label className="mb-2 text-lg">{titleProp}</label>
      <select
        disabled={disabled}
        className="border rounded-md py-2 px-4 w-48"
        onChange={onChange}
      >
        {options}
      </select>
    </div>
  );
};

export default Select;
