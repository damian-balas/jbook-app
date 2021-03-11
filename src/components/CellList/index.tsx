import { useTypedSelector } from "../../hooks/useTypedSelector";
import CellListItem from "../CellListItem";

const CellList: React.FC = () => {
  const cells = useTypedSelector(({ cells: { order, data } }) => {
    return order.map((orderId) => data[orderId]);
  });

  const renderedCells = cells.map((cell) => (
    <CellListItem key={cell.id} {...cell} />
  ));

  return <div>{renderedCells}</div>;
};

export default CellList;
