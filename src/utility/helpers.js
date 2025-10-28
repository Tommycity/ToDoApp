import { toast } from "react-toastify";

export const successMessage = (message) => {
  return toast.success(message);
};
export const errorMessage = (message) => toast.error(message);
export const infoMessage = (message) => toast.info(message);

export const currencyFormatter = (amount) => {
  const fm = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  });
  return fm.format(amount);
};

export const saleDateFormatter = (dateString) => {
  const options = {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };
  return new Date(dateString).toLocaleString("en-US", options);
};

// export const dateFormatter = (date) => {
//   var dateString = new Date(date).toString();
//   // console.log({ dateString });
//   var splittedDateString = dateString.split(" ");
//   var day = splittedDateString[0];
//   var day2 = splittedDateString[1];
//   var month = splittedDateString[2];
//   var year = splittedDateString[3];
//   var formatttedDate = `${day}, ${day2} ${month}, ${year}`;
//   return formatttedDate;
// };
