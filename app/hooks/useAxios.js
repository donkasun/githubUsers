import {useState, useEffect} from 'react';
import axios from 'axios';

import {githubToken} from '../../config';

axios.defaults.baseURL = 'https://api.github.com';
axios.defaults.headers.common.Authorization = `bearer ${githubToken}`;

export const useAxios = (axiosParams, executeOnMount = true) => {
  const [response, setResponse] = useState(undefined);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchData = async params => {
    try {
      setLoading(true);
      const result = await axios.request(params);
      setResponse(result.data);
    } catch (error) {
      setResponse();
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (executeOnMount) {
      fetchData(axiosParams);
    }
  }, []);

  return {response, error, loading, execute: fetchData};
};
