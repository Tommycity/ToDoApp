import { useFormikContext } from "formik";

const AppSubmitButton = ({
  title,
  disabled = false,
  className,
  full = false,
}) => {
  const { handleSubmit, isSubmitting } = useFormikContext();
  // Determine button color based on title
  const getButtonColor = () => {
    if (title.toLowerCase() === "update")
      return "bg-blue-600 hover:bg-blue-700";
    return "bg-green-600 hover:bg-green-700"; // default create button color
  };

  return (
    <button
      type="button"
      onClick={handleSubmit}
      disabled={disabled ? true : isSubmitting ? true : false}
      className={`${full ? "w-full" : "w-fit"} p-2 rounded-md transition-colors
        ${(disabled || isSubmitting) && "opacity-50"}
        ${getButtonColor()}
        ${className}`}
    >
      {isSubmitting ? "Submitting..." : title}
    </button>
  );
};

export default AppSubmitButton;
