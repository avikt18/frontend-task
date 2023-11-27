import React from "react";
import { Table } from "antd";
import useFetchTableData from "../hooks/useFetchTableData";

function QueryResultTable({query}) {
  const { data, loading, error } = useFetchTableData(query);

  let columns =
    data &&
    Object.keys(data[0]).map((key) => ({
      key: key,
      title: key === "key" ? "#" : key,
      dataIndex: key,
    }));
  return (
    <div className="min-h-[50vh] min-w-full overflow-auto rounded-lg mb-16 flex-1 flex justify-center items-center absolute bottom-0 border-2">
      {!error && !loading && !data && (
        <span className="text-2xl opacity-40">Nothing to show here</span>
      )}
      {error && "Error fetching query data"}
      {loading && "loading..."}
      {!error && !loading && data && (
        <Table
          dataSource={data}
          columns={columns}
          pagination={{ pageSize: 10 }}
          scroll={{ y: 430 }}
        />
      )}
    </div>
  );
}

export default QueryResultTable;
