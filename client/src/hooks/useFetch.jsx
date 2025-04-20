import { useState, useEffect, useCallback } from "react";
import instance from "../helper/axiosInstance";

const DEFAULT_ERROR_MESSAGE = "An internal error occurred";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    const controller = new AbortController();
    const signal = controller.signal;

    try {
      const res = await instance.get(url, { signal });
      if (res.data) setData(res.data);
    } catch (err) {
      if (err.name !== "CanceledError") {
        setError(
          err?.response?.data?.message || err?.message || DEFAULT_ERROR_MESSAGE
        );
      }
    } finally {
      setLoading(false);
    }

    return () => controller.abort();
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};

export default useFetch;
