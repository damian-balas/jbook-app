import { CellTypes } from "./../cell";
import {
  Action,
  Direction,
  UpdateCellAction,
  MoveCellAction,
  InsertCellBeforeAction,
  DeleteCellAction,
} from "./../actions";
import { ACTION_TYPE } from "../action-types";

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

export const insertCellBefore = (
  id: string,
  cellType: CellTypes,
): InsertCellBeforeAction => {
  return {
    type: ACTION_TYPE.INSERT_CELL_BEFORE,
    payload: {
      id,
      type: cellType,
    },
  };
};
