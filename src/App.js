import { useState } from "react";
import Navbar from "./components/Navbar";
import QueryPanel from "./components/QueryPanel";
import Sidebar from "./components/Sidebar";
import { setDynamicTitle } from "./utils";

function App() {
  const [activeTableName, setActiveTableName] = useState("");
  const handleTableQuery = (tableName) => {
    setActiveTableName(tableName);
    setDynamicTitle(tableName)
  };
  return (
    <div className="App">
      <Navbar />
      <div className="flex h-full">
        <Sidebar
          handleTableQuery={handleTableQuery}
          activeTableName={activeTableName}
        />
        <QueryPanel
          query={activeTableName}
          handleQueryChange={handleTableQuery}
        />
      </div>
    </div>
  );
}

export default App;
