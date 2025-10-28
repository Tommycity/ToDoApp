import * as yup from "yup";

export const validateAddActivity = () => {
  const validationSchema = yup.object({
    activity: yup.string().required("Activity is missing"),
  });
  return validationSchema;
};
