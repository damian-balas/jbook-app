import produce from "immer";
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

const reducer = produce((state: CellsState = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case ACTION_TYPE.UPDATE_CELL: {
      const { id, content } = action.payload;

      state.data[id].content = content;
      break;
    }
    case ACTION_TYPE.DELETE_CELL: {
      delete state.data[action.payload];
      state.order = state.order.filter((id) => id !== action.payload);

      break;
    }
    case ACTION_TYPE.MOVE_CELL: {
      const { direction, id } = action.payload;
      const index = state.order.findIndex((orderId) => orderId === id);
      const targetIndex = direction === "up" ? index - 1 : index + 1;

      if (
        index < 0 ||
        targetIndex < 0 ||
        targetIndex > state.order.length - 1
      ) {
        break;
      }

      state.order[index] = state.order[targetIndex];
      state.order[targetIndex] = action.payload.id;

      break;
    }
    case ACTION_TYPE.INSERT_CELL_BEFORE: {
      const cell: Cell = {
        content: "",
        type: action.payload.type,
        id: randomId(),
      };

      state.data[cell.id] = cell;

      const index = state.order.findIndex(
        (orderId) => orderId === action.payload.id,
      );

      if (index < 0) {
        state.order.push(cell.id);
      } else {
        state.order.splice(index, 0, cell.id);
      }

      break;
    }
    default: {
      return state;
    }
  }
  return state;
});

const randomId = (): string => {
  const id = Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, "");

  if (!id || id.length < 8) {
    return randomId();
  }
  return id;
};

export default reducer;
