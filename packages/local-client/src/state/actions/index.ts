import { CellTypes, Cell } from "./../cell";
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

export type InsertCellAfterAction = {
  type: ACTION_TYPE.INSERT_CELL_AFTER;
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

export type BundleStartAction = {
  type: ACTION_TYPE.BUNDLE_START;
  payload: {
    cellId: string;
  };
};

export type BundleCompleteAction = {
  type: ACTION_TYPE.BUNDLE_COMPLETE;
  payload: {
    cellId: string;
    bundle: {
      code: string;
      error: string;
    };
  };
};

export type FetchCellsAction = {
  type: ACTION_TYPE.FETCH_CELLS;
};

export type FetchCellsCompleteAction = {
  type: ACTION_TYPE.FETCH_CELLS_COMPLETE;
  payload: Cell[];
};

export type FetchCellsErrorAction = {
  type: ACTION_TYPE.FETCH_CELLS_ERROR;
  payload: string;
};

export type SaveCellsErrorAction = {
  type: ACTION_TYPE.SAVE_CELLS_ERROR;
  payload: string;
};

export type Action =
  | MoveCellAction
  | DeleteCellAction
  | InsertCellAfterAction
  | UpdateCellAction
  | BundleStartAction
  | BundleCompleteAction
  | FetchCellsAction
  | FetchCellsCompleteAction
  | FetchCellsErrorAction
  | SaveCellsErrorAction;
