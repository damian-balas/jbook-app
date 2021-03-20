import MDEditor, { MDEditorProps } from "@uiw/react-md-editor";
import { useCallback, useEffect, useRef, useState } from "react";
import { useActions } from "../../hooks/useActions";
import { Cell } from "../../state";
import styles from "./TextEditor.module.scss";

type RequiredMDEditorProps = Required<MDEditorProps>;

type TextEditorProps = Cell;

const TextEditor: React.FC<TextEditorProps> = ({ id, content, type }) => {
  const [editing, setEditing] = useState(false);
  const editorWrapperRef = useRef<HTMLDivElement | null>(null);
  const { updateCell } = useActions();

  const handleEditorValueChange = useCallback<
    RequiredMDEditorProps["onChange"]
  >(
    (val) => {
      updateCell(id, val || "");
    },
    [updateCell, id],
  );

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
        <MDEditor value={content} onChange={handleEditorValueChange} />
      </div>
    );
  }

  return (
    <div
      className={`card ${styles["text-editor"]}`}
      onClick={() => setEditing(true)}
    >
      <MDEditor.Markdown
        className="card-content"
        source={content || "Click to edit..."}
      />
    </div>
  );
};

export default TextEditor;
