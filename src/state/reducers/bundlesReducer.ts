import produce from "immer";
import { ACTION_TYPE } from "../action-types";
import { Action } from "../actions";

type BundlesState = {
  [key: string]: {
    bundling: boolean;
    code: string;
    error: string;
  };
};

const INITIAL_STATE: BundlesState = {};

const reducer = produce(
  (state: BundlesState = INITIAL_STATE, action: Action): BundlesState => {
    switch (action.type) {
      case ACTION_TYPE.BUNDLE_START: {
        state[action.payload.cellId] = {
          bundling: true,
          code: "",
          error: "",
        };
        break;
      }
      case ACTION_TYPE.BUNDLE_COMPLETE: {
        state[action.payload.cellId] = {
          bundling: false,
          code: action.payload.bundle.code,
          error: action.payload.bundle.error,
        };
        break;
      }
      default: {
        return state;
      }
    }
    return state;
  },
);

export default reducer;
