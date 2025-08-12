import { useState } from 'react';
import { axios } from '../config';

const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const callApi = async (url, payload = {}, method = 'post') => {
    setLoading(true);
    setData(null);
    setError(null);

    try {
      const response = await axios({
        method,
        url,
        ...(method.toLowerCase() === 'get'
          ? { params: payload }
          : { data: payload }),
      });

      if (response.data) {
        const result = response.data?.data || response.data;
        setData(result);
        return result;
      }
    } catch (err) {
      const newError = err?.response?.data?.message || err?.message;
      console.log('Error:', newError);
      setError(newError);
    } finally {
      setLoading(false);
    }
  };

  return { loading, data, callApi, setData, error };
};

export default useApi;
