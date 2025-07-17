import { toast } from "react-toastify";

const errorHandler = (error) => {
  const { response, request, message } = error;
  if (response) {
    toast.error(
      `${response.data.message || response.statusText} - ${response.status}`
    );
  } else if (request) {
    toast.error("No response received from server");
  } else {
    toast.error(`Error: ${message}`);
  }
};

export default errorHandler;
