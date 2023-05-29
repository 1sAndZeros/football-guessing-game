import { useState, useEffect } from 'react';

const useCustomFetch = (url, options) => {
  const [response, setResponse] = useState(null);
  const [err, setError] = useState(null);
  // const [abort, setAbort] = useState(() => {});

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const abortController = new AbortController();
        // const signal = abortController.signal;
        // setAbort(abortController.abort);
        const res = await fetch(url, { ...options });
        const json = await res.json();
        setResponse(json);
      } catch (err) {
        setError(err);
      }
    };
    fetchData();
    // return () => {
    // abort();
    // };
  }, [options, url]);

  return { response, err };
};

export default useCustomFetch;
