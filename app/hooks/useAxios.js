import {useState, useEffect} from 'react';
import axios from 'axios';

import {githubToken} from '../../config';

axios.defaults.baseURL = 'https://api.github.com';
axios.defaults.headers.common.Authorization = `bearer ${githubToken}`;

export const useAxios = axiosParams => {
  const [response, setResponse] = useState(undefined);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchData = async params => {
    try {
      setLoading(true);
      const result = await axios.request(params);
      console.log('result', result);
      setResponse(result.data);
    } catch (error) {
        console.log("err",error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(axiosParams);
  }, []);

  return {response, error, loading};
};
