import MDEditor, { MDEditorProps } from "@uiw/react-md-editor";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./TextEditor.module.scss";

type RequiredMDEditorProps = Required<MDEditorProps>;

const TextEditor: React.FC = () => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState("# Header");
  const editorWrapperRef = useRef<HTMLDivElement | null>(null);

  const handleEditorValueChange = useCallback<
    RequiredMDEditorProps["onChange"]
  >((val) => {
    setValue(val || "");
  }, []);

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        editorWrapperRef.current &&
        event.target &&
        editorWrapperRef.current.contains(event.target as Node)
      ) {
        return;
      }

      setEditing(false);
    };

    document.addEventListener("click", listener, { capture: true });

    return () => {
      document.removeEventListener("click", listener, { capture: true });
    };
  }, []);

  if (editing) {
    return (
      <div className={styles["text-editor"]} ref={editorWrapperRef}>
        <MDEditor value={value} onChange={handleEditorValueChange} />
      </div>
    );
  }

  return (
    <div
      className={`card ${styles["text-editor"]}`}
      onClick={() => setEditing(true)}
    >
      <MDEditor.Markdown className="card-content" source={value} />
    </div>
  );
};

export default TextEditor;
