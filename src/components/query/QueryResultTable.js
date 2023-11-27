import React from "react";
import { Table } from "antd";
import useFetchTableData from "../../hooks/useFetchTableData";
import { CiViewTable } from "react-icons/ci";

function QueryResultTable({ query }) {
  const { data, loading, error } = useFetchTableData(query);

  let columns =
    data &&
    Object.keys(data[0]).map((key) => ({
      key: key,
      title: key === "key" ? "#" : key,
      dataIndex: key,
    }));
  return (
    <div className="max-h-[60vh] min-w-full overflow-auto rounded-lg mb-16 mt-4 flex-1 flex justify-center items-center absolute bottom-0 border-t-2">
      {!error && !loading && !data && (
        <span className="text-2xl opacity-40 flex flex-col items-center">
          <CiViewTable size={45} />
          Nothing to show here
        </span>
      )}
      {error && "Error fetching query data"}
      {loading && "loading..."}
      {!error && !loading && data && (
        <div>
          <Table
            dataSource={data}
            columns={columns}
            pagination={{ pageSize: 10 }}
            scroll={{ y: 430 }}
          />
        </div>
      )}
    </div>
  );
}

export default QueryResultTable;
