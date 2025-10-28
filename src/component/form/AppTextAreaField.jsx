import { useFormikContext } from "formik";
import { useEffect } from "react";

const AppTextAreaField = ({
  name,
  type,
  placeholder,
  className,
  defaultValue,
  rows = 4,
}) => {
  const { errors, values, touched, handleBlur, handleChange, setFieldTouched } =
    useFormikContext();

  const value = values[name];
  const error = errors[name];
  const isInputTouched = touched[name];

  // Add click handler to clear error after a delay
  useEffect(() => {
    const handleWindowClick = () => {
      if (error && isInputTouched) {
        // Clear error after 2 seconds
        const timeoutId = setTimeout(() => {
          setFieldTouched(name, false);
        }, 2000);

        // Clean up timeout if component unmounts
        return () => clearTimeout(timeoutId);
      }
    };

    window.addEventListener("click", handleWindowClick);
    return () => window.removeEventListener("click", handleWindowClick);
  }, [error, isInputTouched, name, setFieldTouched]);

  // apply provided className to the wrapper so width utilities (eg. w-4/5)
  // control the overall component width. textarea itself stays full-width
  const wrapperClass = `${className ?? "w-full"}`;
  const textareaClass = `border border-[rgb(228,230,252)] rounded-md p-2 w-full`;

  // determine the value to use for a controlled textarea. If Formik's value
  // is undefined/null (e.g. before Formik initializes), fall back to the
  // provided `defaultValue`. We must NOT pass both `value` and
  // `defaultValue` to avoid React warning about controlled vs uncontrolled.
  const controlledValue =
    value === undefined || value === null ? defaultValue ?? "" : value;

  return (
    <div className={`flex flex-col relative min-h-[120px] ${wrapperClass}`}>
      <textarea
        onChange={handleChange(name)}
        onBlur={handleBlur(name)}
        value={controlledValue}
        rows={rows}
        className={textareaClass}
        type={type}
        placeholder={placeholder}
      />
      {error && isInputTouched && (
        <span className="absolute -bottom-6 left-0 text-red-500 text-sm transition-opacity duration-300 opacity-100">
          {error}
        </span>
      )}
    </div>
  );
};

export default AppTextAreaField;
