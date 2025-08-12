import { useState, useEffect, useCallback } from 'react';
import { axios } from '../config';

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
      const res = await axios.get(url, { signal });
      if (res.data) setData(res?.data?.data);
    } catch (err) {
      setError(err?.response?.data?.message || 'An internal error occurred');
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
