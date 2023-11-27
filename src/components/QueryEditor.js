import tableQueries from "../mockData/mockTableQueries";
import { UnControlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import { FaPlay, FaSave } from "react-icons/fa";
import { FcCancel } from "react-icons/fc";

function QueryEditor({ handleQueryChange, query }) {
  return (
    <div className="space-y-2 p-4">
      <div className="flex justify-between">
        <div className="space-x-2 flex">
          <button className="primary-btn">
            <FaPlay />
            Run query
          </button>
          <button>Save query</button>
          <button
            className="hover:border-red-300"
            onClick={() => handleQueryChange("")}
          >
            <FcCancel />
            Clear query
          </button>
        </div>
        <button>
          <FaSave />
          Download as CSV
        </button>
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
