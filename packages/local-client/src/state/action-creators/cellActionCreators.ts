import { Dispatch } from "redux";
import axios from "axios";
import { Cell, CellTypes } from "../cell";
import { RootState } from "../reducers/index";
import {
  Direction,
  UpdateCellAction,
  MoveCellAction,
  InsertCellAfterAction,
  DeleteCellAction,
  Action,
} from "../actions";
import { ACTION_TYPE } from "../action-types";

export const fetchCells = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({ type: ACTION_TYPE.FETCH_CELLS });

    try {
      const { data }: { data: Cell[] } = await axios.get("/cells");

      dispatch({
        type: ACTION_TYPE.FETCH_CELLS_COMPLETE,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ACTION_TYPE.FETCH_CELLS_ERROR,
        payload: error.message,
      });
    }
  };
};

export const updateCell = (id: string, content: string): UpdateCellAction => {
  return {
    type: ACTION_TYPE.UPDATE_CELL,
    payload: {
      id,
      content,
    },
  };
};

export const deleteCell = (id: string): DeleteCellAction => {
  return {
    type: ACTION_TYPE.DELETE_CELL,
    payload: id,
  };
};

export const moveCell = (id: string, direction: Direction): MoveCellAction => {
  return {
    type: ACTION_TYPE.MOVE_CELL,
    payload: {
      id,
      direction,
    },
  };
};

export const insertCellAfter = (
  id: string | null,
  cellType: CellTypes,
): InsertCellAfterAction => {
  return {
    type: ACTION_TYPE.INSERT_CELL_AFTER,
    payload: {
      id,
      type: cellType,
    },
  };
};

export const saveCells = () => {
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    const {
      cells: { data, order },
    } = getState();

    const cells = order.map((id) => data[id]);

    try {
      await axios.post("/cells", { cells });
    } catch (error) {
      dispatch({
        type: ACTION_TYPE.SAVE_CELLS_ERROR,
        payload: error.message,
      });
    }
  };
};
