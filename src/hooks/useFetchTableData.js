import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import axios from "axios";
import { parseCSVData } from "../utils";

const useFetchTableData = (tableName) => {
  const [data, setData] = useState(null);
  const [dataLength, setDataLength] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [timeToFetch, setTimeToFetch] = useState(null);
  const cache = useRef({}).current;

  const fetchData = useCallback(async () => {
    if (!tableName) {
      setData(null);
      setError(null);
      setTimeToFetch(null);
      setDataLength(0);
      return;
    }

    setData(null);
    setError(null);
    setTimeToFetch(null);
    setDataLength(0);

    if (cache[tableName]) {
      setData(cache[tableName].data.data);
      setTimeToFetch(cache[tableName].timeToFetch);
      setDataLength(cache[tableName].data.dataRows);
      return;
    }

    setLoading(true);
    const startTime = performance.now();
    try {
      const response = await axios.get(
        `https://raw.githubusercontent.com/graphql-compose/graphql-compose-examples/master/examples/northwind/data/csv/${tableName}.csv`
      );
      const endTime = performance.now();
      let fetchTime = endTime - startTime;
      fetchTime = (fetchTime/1000).toFixed(2)   //convert to seconds rounded off to 2 decimal places
      const processedData = parseCSVData(response.data);
      const length = processedData.length;
      cache[tableName] = {
        data: { data: processedData, dataRows: length },
        timeToFetch: fetchTime,
      };
      setData(processedData);
      setTimeToFetch(fetchTime);
      setDataLength(length);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [tableName]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data: { data, dataRows: dataLength }, loading, error, timeToFetch };
};

export default useFetchTableData;
