import styles from "./CodeEditor.module.scss";
import "./syntax.scss";
import MonacoEditor, {
  EditorDidMount,
  EditorProps,
} from "@monaco-editor/react";
import { useCallback, useRef } from "react";
import prettier from "prettier";
import parser from "prettier/parser-babel";
import editor from "monaco-editor";
import codeShift from "jscodeshift";
import Highlighter from "monaco-jsx-highlighter";

const options: EditorProps["options"] = {
  wordWrap: "on",
  minimap: {
    enabled: false,
  },
  showUnused: false,
  folding: false,
  lineNumbersMinChars: 3,
  fontSize: 14,
  scrollBeyondLastLine: false,
  automaticLayout: true,
};

type CodeEditorProps = {
  initialValue: string;
  onChange(value: string): void;
};

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
  const monacoEditorRef = useRef<editor.editor.IStandaloneCodeEditor | null>(
    null,
  );
  const onEditorDidMount = useCallback<EditorDidMount>(
    (getValue, monacoEditor) => {
      monacoEditorRef.current = monacoEditor;
      monacoEditor.onDidChangeModelContent(() => {
        onChange(getValue());
      });

      monacoEditor.getModel()?.updateOptions({ tabSize: 2 });

      const highlighter = new Highlighter(
        // @ts-ignore
        window.monaco,
        codeShift,
        monacoEditor,
      );

      highlighter.highLightOnDidChangeModelContent(
        () => {},
        () => {},
        undefined,
        () => {},
      );
    },
    [onChange],
  );

  const onFormatClick = () => {
    if (!monacoEditorRef.current) {
      return;
    }
    const unformatted = monacoEditorRef.current.getModel()?.getValue();

    if (unformatted) {
      const formatted = prettier
        .format(unformatted, {
          parser: "babel",
          plugins: [parser],
          useTabs: false,
          semi: true,
          singleQuote: true,
        })
        .replace(/\n$/, "");

      monacoEditorRef.current.setValue(formatted);
    }
  };
  return (
    <div id="editor-wrapper" className={styles["editor-wrapper"]}>
      <button
        className={`button button-format is-primary is-small ${styles["button-format"]}`}
        type="button"
        onClick={onFormatClick}
      >
        Format
      </button>
      <MonacoEditor
        value={initialValue}
        editorDidMount={onEditorDidMount}
        options={options}
        theme="dark"
        language="javascript"
      />
    </div>
  );
};

export default CodeEditor;
