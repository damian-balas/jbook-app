import { useCallback, useEffect } from "react";
import CodeEditor from "../CodeEditor";
import Preview from "../Preview";

import Resizable from "../Resizable";

import styles from "./CodeCell.module.scss";
import { Cell } from "../../state";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useCumulativeCode } from "../../hooks/useCumulativeCode";

type CodeCellProps = Cell;

const CodeCell: React.FC<CodeCellProps> = ({ content, id, type }) => {
  const { updateCell, createBundle } = useActions();
  const bundle = useTypedSelector(({ bundles: { [id]: bundle } }) => bundle);
  const cumulativeCode = useCumulativeCode(id);

  const onChangeHandler = useCallback(
    (value: string) => {
      updateCell(id, value);
    },
    [updateCell, id],
  );

  useEffect(() => {
    if (!cumulativeCode) {
      createBundle(id, cumulativeCode);
      return;
    }

    const timer = setTimeout(async () => {
      createBundle(id, cumulativeCode);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [id, createBundle, cumulativeCode]);

  return (
    <Resizable direction="vertical">
      <div className={styles["code-cell"]}>
        <Resizable direction="horizontal">
          <CodeEditor initialValue={content} onChange={onChangeHandler} />
        </Resizable>
        <div className={styles.preview__wrapper}>
          {!bundle || bundle.bundling ? (
            <div className={styles["progress__wrapper"]}>
              <progress className="progress is-small is-primary" max="100">
                Loading
              </progress>
            </div>
          ) : (
            <Preview code={bundle.code} bundleErrorMessage={bundle.error} />
          )}
        </div>
      </div>
    </Resizable>
  );
};

export default CodeCell;
