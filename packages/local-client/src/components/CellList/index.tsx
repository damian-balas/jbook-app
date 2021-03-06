import { Fragment, useEffect } from "react";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import AddCell from "../AddCell";
import CellListItem from "../CellListItem";
import styles from "./CellList.module.scss";

const CellList: React.FC = () => {
  const { fetchCells } = useActions();
  const cells = useTypedSelector(({ cells: { order, data } }) => {
    return order.map((orderId) => data[orderId]);
  });

  useEffect(() => {
    fetchCells();
  }, [fetchCells]);

  const renderedCells = cells.map((cell) => (
    <Fragment key={cell.id}>
      <CellListItem {...cell} />
      <AddCell previousCellId={cell.id} />
    </Fragment>
  ));

  return (
    <div className={styles["cell-list"]}>
      <AddCell forceVisible={cells.length === 0} previousCellId={null} />
      {renderedCells}
    </div>
  );
};

export default CellList;
