import { axiosInstance } from '@/lib/utils';
import { useState, useEffect, useCallback } from 'react';

interface UseFetchResult<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
    refetch: () => void;
}

const useFetch = <T,>(url: string): UseFetchResult<T> => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await axiosInstance.get(url);
            if (res.data) setData(res.data);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    }, [url]);

    useEffect(() => {
        fetchData();
    }, [url, fetchData]);

    return { data, loading, error, refetch: fetchData };
};

export default useFetch;
