import { useCallback, useState } from "react";
import CodeEditor from "../CodeEditor";
import Preview from "../Preview";

import bundle from "../../bundler";

const CodeCell = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  const onClickHandler = async () => {
    const output = await bundle(input);

    setCode(output);
  };

  const onChangeHandler = useCallback((value: string) => {
    setInput(value);
  }, []);

  return (
    <div>
      <CodeEditor initialValue="const a = 1;" onChange={onChangeHandler} />
      <div>
        <button type="button" onClick={onClickHandler}>
          Submit
        </button>
      </div>
      <Preview code={code} />
    </div>
  );
};

export default CodeCell;
