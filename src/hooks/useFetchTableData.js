import { useState, useEffect, useCallback, useRef, useMemo } from "react";
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
      setData(cache[tableName].raw);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        `https://raw.githubusercontent.com/graphql-compose/graphql-compose-examples/master/examples/northwind/data/csv/${tableName}.csv`
      );
      cache[tableName] = { raw: response.data }; // Cache the raw response data
      setData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [tableName]); // eslint-disable-line

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Memoize processed data
  const processedData = useMemo(() => {
    return data ? parseCSVData(data) : null;
  }, [data]);

  return { data: processedData, loading, error };
};

export default useFetchTableData;
