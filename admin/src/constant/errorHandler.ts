import { toast } from "react-toastify";
import { AxiosError } from "axios";

const errorHandler = (error: AxiosError) => {
  if (error && typeof error === "object" && "isAxiosError" in error) {
    const axiosError = error as AxiosError<{ message: string }>;
    if (axiosError.response) {
      toast.error(
        `${axiosError.response.data.message || axiosError.response.statusText} - status:${axiosError.response.status}`
      );
    } else if (axiosError.request) {
      toast.error("No response received from server");
    } else {
      toast.error(`Error: ${axiosError.message}`);
    }
  } else {
    toast.error("An unexpected error occurred.");
  }
};

export default errorHandler;
