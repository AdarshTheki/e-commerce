import { toast } from "react-toastify";

const errorHandler = (error) => {
  const { response, request, message } = error;
  if (response.status === 401) {
    toast.error("You are not authorized, Please login user!");
  } else if (response) {
    toast.error(`${response.data.message} - ${response.status}`);
  } else if (request) {
    toast.error("No response received from server");
  } else {
    toast.error(`Error: ${message}`);
  }
};

export default errorHandler;
