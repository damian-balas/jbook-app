import { Cell } from "../../state";
import ActionBar from "../ActionBar";
import CodeCell from "../CodeCell";
import TextEditor from "../TextEditor";

import styles from "./CellListItem.module.scss";

type CellListItemProps = Cell;

const CellListItem: React.FC<CellListItemProps> = ({ id, content, type }) => {
  let child: JSX.Element;

  if (type === "code") {
    child = (
      <>
        <div className={styles["action-bar-wrapper"]}>
          <ActionBar id={id} />
        </div>
        <CodeCell id={id} content={content} type={type} />
      </>
    );
  } else {
    child = (
      <>
        <ActionBar id={id} />
        <TextEditor id={id} content={content} type={type} />
      </>
    );
  }

  return <div className={styles["cell-list-item"]}>{child}</div>;
};

export default CellListItem;
