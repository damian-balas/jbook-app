import { useCallback, useEffect, useState } from "react";
import CodeEditor from "../CodeEditor";
import Preview from "../Preview";

import bundle from "../../bundler";
import Resizable from "../Resizable";

import styles from "./CodeCell.module.scss";
import { Cell } from "../../state";
import { useActions } from "../../hooks/useActions";

type CodeCellProps = Cell;

const CodeCell: React.FC<CodeCellProps> = ({ content, id, type }) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const { updateCell } = useActions();

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundle(content);

      setCode(output.code);
      setError(output.err);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [content]);

  const onChangeHandler = useCallback(
    (value: string) => {
      updateCell(id, value);
    },
    [updateCell, id],
  );

  return (
    <Resizable direction="vertical">
      <div className={styles["code-cell"]}>
        <Resizable direction="horizontal">
          <CodeEditor initialValue={content} onChange={onChangeHandler} />
        </Resizable>
        <Preview code={code} bundleErrorMessage={error} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
