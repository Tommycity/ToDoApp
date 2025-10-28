import { Activity } from "react";


export const addActivityValues = (data) => {
  const initialValues = {
    activity: data ? data.activity : "",
  };
  return initialValues;
};

