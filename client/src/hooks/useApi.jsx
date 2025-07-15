
import { useState } from "react";
import { axios, errorHandler } from "../helper";

const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const callApi = async (url, payload) => {
    setLoading(true);
    setData(null);
    try {
      const res = await axios.post(url, payload);
      if (res.data) {
        setData(res.data.result);
        return res.data.result;
      }
    } catch (error) {
      errorHandler(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, data, callApi, setData };
};

export default useApi;
