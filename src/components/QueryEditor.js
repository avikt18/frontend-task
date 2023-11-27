import tableQueries from "../mockData/mockTableQueries";
import { UnControlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";

function QueryEditor({ handleQueryChange, query }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <div className="space-x-2">
          <button className="primary-btn">Run query</button>
          <button>Save query</button>
          <button
            className="hover:border-red-300"
            onClick={() => handleQueryChange("")}
          >
            Clear query
          </button>
        </div>
        <button>Download as CSV</button>
      </div>
      <CodeMirror
        value={tableQueries[query]}
        options={{
          mode: "sql",
          theme: "material",
          lineNumbers: true,
        }}
        viewportMargin={Infinity}
      />
    </div>
  );
}

export default QueryEditor;
