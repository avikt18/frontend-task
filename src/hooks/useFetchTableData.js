import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import { parseCSVData } from "../utils";

const useFetchTableData = (tableName) => {
  console.log("fetching data", tableName);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Using an object to cache the responses.
  const cache = useRef({}).current;

  const fetchData = useCallback(async () => {
    if (!tableName) {
      setData(null);
      setError(null);
      return;
    }

    // Reset data and error states on new fetch
    setData(null);
    setError(null);

    // Check if data for this table is already cached.
    if (cache[tableName]) {
      setData(cache[tableName]);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        `https://raw.githubusercontent.com/graphql-compose/graphql-compose-examples/master/examples/northwind/data/csv/${tableName}.csv`
      );
      const processedData = parseCSVData(response.data);
      console.log(processedData);
      cache[tableName] = processedData; // Cache the response data.
      setData(processedData);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [tableName]); // eslint-disable-line

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error };
};

export default useFetchTableData;
