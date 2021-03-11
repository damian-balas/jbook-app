import { Cell } from "../../state";
import CodeCell from "../CodeCell";
import TextEditor from "../TextEditor";

interface CellListItemProps extends Cell {}

const CellListItem: React.FC<CellListItemProps> = ({ id, content, type }) => {
  let child: JSX.Element;

  if (type === "code") {
    child = <CodeCell />;
  } else {
    child = <TextEditor />;
  }

  return <div>{child}</div>;
};

export default CellListItem;
