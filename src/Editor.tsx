import React, { useState, useEffect } from "react";
import ReactDiffViewer from "react-diff-viewer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react";

interface EditorProps {
  sql: string;
}

const Editor: React.FC<EditorProps> = ({ sql }) => {
  const [currentSql, setCurrentSql] = useState<string>(sql);
  const [showDiff, setShowDiff] = useState<boolean>(false);

  useEffect(() => {
    if (sql !== currentSql) {
      setShowDiff(true);
    }
  }, [sql, currentSql]);

  const handleAccept = () => {
    setCurrentSql(sql);
    setShowDiff(false);
  };

  const handleReject = () => {
    setShowDiff(false);
  };

  const DiffActions = () => (
    <div className="flex justify-end space-x-2 mb-4">
      <Tippy
        content="Accept changes"
        theme="carbon"
        arrow={true}
        placement="top"
        animation="scale"
        duration={[200, 0]}
      >
        <button
          onClick={handleAccept}
          className="px-3 py-2 text-white bg-carbon-green-60 hover:bg-carbon-green-50 rounded focus:outline-none transition-colors duration-200"
        >
          <FontAwesomeIcon icon={faCheck} size="sm" />
        </button>
      </Tippy>
      <Tippy
        content="Reject changes"
        theme="carbon"
        arrow={true}
        placement="top"
        animation="scale"
        duration={[200, 0]}
      >
        <button
          onClick={handleReject}
          className="px-3 py-2 text-white bg-carbon-red-60 hover:bg-carbon-red-50 rounded focus:outline-none transition-colors duration-200"
        >
          <FontAwesomeIcon icon={faTimes} size="sm" />
        </button>
      </Tippy>
    </div>
  );

  return (
    <div className="p-6 h-full flex flex-col">
      {showDiff ? (
        <>
          <DiffActions />
          <div className="bg-carbon-gray-100 rounded overflow-auto flex-grow">
            <ReactDiffViewer
              oldValue={currentSql}
              newValue={sql}
              splitView={false}
              useDarkTheme={true}
              styles={{
                variables: {
                  dark: {
                    diffViewerBackground: "#161616",
                    diffViewerColor: "#f4f4f4",
                    addedBackground: "#198038",
                    addedColor: "#defbe6",
                    removedBackground: "#da1e28",
                    removedColor: "#fff1f1",
                    wordAddedBackground: "#24a148",
                    wordRemovedBackground: "#fa4d56",
                  }
                }
              }}
            />
          </div>
        </>
      ) : (
        <div className="bg-carbon-gray-100 text-carbon-blue-30 p-4 rounded overflow-auto flex-grow">
          <pre className="whitespace-pre-wrap">
            {currentSql || "-- Your SQL will appear here"}
          </pre>
        </div>
      )}
    </div>
  );
};

export default Editor;
