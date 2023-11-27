import React from "react";
import tablesData from "../mockData/mockTableNames";
import { CiViewTable } from "react-icons/ci";

function Sidebar({ handleTableQuery, activeTableName }) {
  console.log(activeTableName);
  return (
    <div className="w-1/6 h-full p-4 bg-slate-100 border-r border-slate-200 shadow-sm">
      <div className="space-y-2">
        <h2>Tables</h2>
        <div>
          {tablesData.map((tableName) => (
            <p
              onClick={() => handleTableQuery(tableName)}
              className={`w-full rounded-md  cursor-pointer p-1 transition-colors flex items-center gap-1 ${
                activeTableName === tableName
                  ? "text-white bg-blue-500 hover:bg-blue-600"
                  : "hover:bg-slate-200"
              }`}
              key={tableName}
            >
              <CiViewTable />
              {tableName}
            </p>
          ))}
        </div>
      </div>
      <div className="space-y-2 mt-2 pt-2 border-t">
        <h2>Saved queries</h2>
      </div>
    </div>
  );
}

export default Sidebar;
