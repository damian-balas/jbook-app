import { Dispatch } from "redux";
import { Action } from "../actions";
import { ACTION_TYPE } from "../action-types/index";
import { RootState } from "../reducers/index";
import { saveCells } from "../action-creators";
import debounce from "../../utils/debounce";

export const persist = ({
  dispatch,
  getState,
}: {
  dispatch: Dispatch<Action>;
  getState: () => RootState;
}) => {
  const debouncedSaveCells = debounce(() => {
    saveCells()(dispatch, getState);
  }, 250);

  return (next: (action: Action) => void) => {
    return (action: Action) => {
      next(action);

      if (
        [
          ACTION_TYPE.MOVE_CELL,
          ACTION_TYPE.UPDATE_CELL,
          ACTION_TYPE.INSERT_CELL_AFTER,
          ACTION_TYPE.DELETE_CELL,
        ].includes(action.type)
      ) {
        debouncedSaveCells();
      }
    };
  };
};
