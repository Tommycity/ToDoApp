import { useFormikContext } from "formik";
import { useState } from "react";
import { FaEye } from "react-icons/fa";

const AppInputField = ({
  name,
  type,
  placeholder,
  className,
  defaultValue,
}) => {
  const { errors, values, touched, handleBlur, handleChange } =
    useFormikContext();
  const [showPassword, setshowPassword] = useState(false);

  const value = values[name];
  const error = errors[name];
  const isInputTouched = touched[name];

  const togglePassword = () => {
    setshowPassword(!showPassword);
  };

  return (
    <div className={`flex w-full flex-col gap-1 ${className}`}>
      {type == "password" ? (
        <div className=" flex flex-col gap-2">
          <div className="flex gap-2 items-center primary-input h-[35px]">
            <input
              onChange={handleChange(name)}
              onBlur={handleBlur(name)}
              value={value}
              type={showPassword ? "text" : "password"}
              placeholder={placeholder}
              className="h-full w-[90%] bg-transparent border-0 border-black p-3"
            />
            <FaEye onClick={togglePassword} className="cursor-pointer" />
          </div>
          {error && <span className="error">{error}</span>}
        </div>
      ) : (
        <div className="flex flex-col gap-2 ">
          <input
            onChange={handleChange(name)}
            onBlur={handleBlur(name)}
            value={value}
            // defaultValue={defaultValue}
            type={type}
            placeholder={placeholder}
            className="primary-input w-full h-[35px] p-3 border-2 border-[#019dd6] rounded-md"
          />
          {error && isInputTouched && <span className="error">{error}</span>}
        </div>
      )}
    </div>
  );
};

export default AppInputField;
