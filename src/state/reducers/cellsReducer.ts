import { Cell } from "../cell";
import { ACTION_TYPE } from "../action-types";
import { Action } from "../actions";

interface CellsState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const INITIAL_STATE: CellsState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const reducer = (state = INITIAL_STATE, action: Action): CellsState => {
  switch (action.type) {
    case ACTION_TYPE.UPDATE_CELL: {
      const { id, content } = action.payload;
      return {
        ...state,
        data: {
          ...state.data,
          [id]: {
            ...state.data[id],
            content: content,
          },
        },
      };
    }
    case ACTION_TYPE.DELETE_CELL: {
      return state;
    }
    case ACTION_TYPE.MOVE_CELL: {
      return state;
    }
    case ACTION_TYPE.INSERT_CELL_BEFORE: {
      return state;
    }
    default: {
      return state;
    }
  }
};

export default reducer;
