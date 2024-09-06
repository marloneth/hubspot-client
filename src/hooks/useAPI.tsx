import axios, { AxiosRequestConfig } from "axios";
import { useState } from "react";

function useAPI() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async (
    url: string,
    method = "GET",
    query?: { [s: string]: string },
    body: { [s: string]: string } = {}
  ) => {
    try {
      let response = null;
      const config: AxiosRequestConfig<any> = {};

      if (query) {
        const queryParams = new URLSearchParams();
        Object.entries(query).map(([key, value]) => {
          if (value) queryParams.append(key, value);
        });

        config.params = queryParams;
      }

      switch (method) {
        case "GET":
          setData(null);
          setIsLoading(true);
          response = await axios.get(url, config);
          response.data.data && setData(response.data.data);
          break;
        case "DELETE":
          response = await axios.delete(url, config);
          break;
        case "POST":
          response = await axios.post(url, body, config);
          return response.data;
        case "PATCH":
          response = await axios.patch(url, body, config);
          break;
      }
    } catch (error) {
      const errorObject = error as { response: { data: { message: string } } };

      if (!axios.isCancel(error)) {
        throw errorObject?.response?.data || new Error("Algo salió mal");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, fetchData };
}

export default useAPI;
