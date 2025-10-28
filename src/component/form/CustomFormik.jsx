import { Formik } from "formik";

const CustomFormik = ({
  children,
  initialValues,
  validationSchema,
  onSubmit,
  enableReinitialize = false,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize={enableReinitialize}
    >
      {() => {
        return children;
      }}
    </Formik>
  );
};

export default CustomFormik;
