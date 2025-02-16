import { useState } from "react";

export default useApi = (apiFunc) => {

  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const request = async (...args) => {
    setLoading(true);
    const response = await apiFunc(...args);
    setLoading(false);
    setError(!response.ok);
    if (!response.ok) {
      setError(response.data)
    }
    // console.log(response.data);
    setData(response.data);
    return response;
  };

  return { request, data, error, loading };
};
