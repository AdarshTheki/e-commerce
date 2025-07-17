import { useState } from "react";
import { axios, errorHandler } from "../helper";

const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const callApi = async (url, payload = {}, method = "post") => {
    setLoading(true);
    setData(null);

    try {
      const response = await axios({
        method,
        url,
        ...(method.toLowerCase() === "get"
          ? { params: payload }
          : { data: payload }),
      });

      if (response.data) {
        const result = response.data?.data || response.data;
        setData(result);
        return result;
      }
    } catch (error) {
      errorHandler(error); // Make sure this function exists
    } finally {
      setLoading(false);
    }
  };

  return { loading, data, callApi, setData };
};

export default useApi;
