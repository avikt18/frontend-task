import QueryResultTable from "./QueryResultTable";
import QueryEditor from "./QueryEditor";

function QueryPanel({ query, handleQueryChange }) {
  return (
    <div className="w-5/6 p-4 relative flex flex-col justify-between">
      <QueryEditor handleQueryChange={handleQueryChange} query={query} />
      <QueryResultTable query={query} />
    </div>
  );
}

export default QueryPanel;
