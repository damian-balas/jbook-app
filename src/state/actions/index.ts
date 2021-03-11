import { CellTypes } from "./../cell";
import { ACTION_TYPE } from "./../action-types";

export type Direction = "up" | "down";

export type MoveCellAction = {
  type: ACTION_TYPE.MOVE_CELL;
  payload: {
    id: string;
    direction: Direction;
  };
};

export type DeleteCellAction = {
  type: ACTION_TYPE.DELETE_CELL;
  payload: string;
};

export type InsertCellBeforeAction = {
  type: ACTION_TYPE.INSERT_CELL_BEFORE;
  payload: {
    id: string | null;
    type: CellTypes;
  };
};

export type UpdateCellAction = {
  type: ACTION_TYPE.UPDATE_CELL;
  payload: {
    id: string;
    content: string;
  };
};

export type Action =
  | MoveCellAction
  | DeleteCellAction
  | InsertCellBeforeAction
  | UpdateCellAction;
