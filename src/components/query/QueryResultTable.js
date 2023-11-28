import React, { Suspense, useMemo } from "react";
import useFetchTableData from "../../hooks/useFetchTableData";
import { CiViewTable } from "react-icons/ci";

const Table = React.lazy(() =>
  import("antd").then((module) => ({ default: module.Table }))
);

function QueryResultTable({ query }) {
  const {
    data: { data, dataRows },
    loading,
    error,
    timeToFetch,
  } = useFetchTableData(query);

  const columns = useMemo(
    () =>
      data
        ? Object.keys(data[0]).map((key) => ({
            key,
            title: key === "key" ? "#" : key,
            dataIndex: key,
          }))
        : [],
    [data]
  );
  if (error) {
    return (
      <QueryResultTableWrapper>
        <div className="h-full w-full text-2xl opacity-40 flex flex-col items-center justify-center">
          Error fetching query data
        </div>
      </QueryResultTableWrapper>
    );
  }

  if (loading) {
    return (
      <QueryResultTableWrapper>
        <div className="h-full w-full text-2xl opacity-40 flex flex-col items-center justify-center">
          Loading...
        </div>
      </QueryResultTableWrapper>
    );
  }

  if (!data) {
    return (
      <QueryResultTableWrapper>
        <div className="h-full w-full text-2xl opacity-40 flex flex-col items-center justify-center">
          <CiViewTable size={45} />
          Nothing to show here
        </div>
      </QueryResultTableWrapper>
    );
  }

  return (
    <QueryResultTableWrapper>
      <Suspense
        fallback={
          <QueryResultTableWrapper>Loading Table...</QueryResultTableWrapper>
        }
      >
        <div className="flex flex-col">
          <div className="flex opacity-50 italic p-4 gap-4">
            <p>Fetched data in {timeToFetch}s</p>
            <p>{dataRows} rows</p>
          </div>
          <Table
            dataSource={data}
            columns={columns}
            pagination={{ pageSize: 10 }}
            scroll={{ y: 430 }}
          />
        </div>
      </Suspense>
    </QueryResultTableWrapper>
  );
}

export default QueryResultTable;

const QueryResultTableWrapper = ({ children }) => (
  <div className="h-[60vh] min-w-full overflow-auto rounded-lg mb-16 mt-4 flex-1 flex justify-center absolute bottom-0 border-t-2">
    {children}
  </div>
);
