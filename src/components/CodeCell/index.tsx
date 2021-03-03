import { useCallback, useEffect, useState } from "react";
import CodeEditor from "../CodeEditor";
import Preview from "../Preview";

import bundle from "../../bundler";
import Resizable from "../Resizable";

import styles from "./CodeCell.module.scss";

const CodeCell = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundle(input);

      setCode(output.code);
      setError(output.err);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  const onChangeHandler = useCallback((value: string) => {
    setInput(value);
  }, []);

  return (
    <Resizable direction="vertical">
      <div className={styles["code-cell"]}>
        <Resizable direction="horizontal">
          <CodeEditor initialValue="const a = 1;" onChange={onChangeHandler} />
        </Resizable>
        <Preview code={code} bundleErrorMessage={error} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
