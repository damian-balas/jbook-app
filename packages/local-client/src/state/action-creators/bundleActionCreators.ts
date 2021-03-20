import { Dispatch } from "redux";
import { ACTION_TYPE } from "../action-types";
import { Action } from "../actions";
import bundle from "../../bundler";

export const createBundle = (cellId: string, input: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ACTION_TYPE.BUNDLE_START,
      payload: {
        cellId,
      },
    });

    const result = await bundle(input);

    dispatch({
      type: ACTION_TYPE.BUNDLE_COMPLETE,
      payload: {
        cellId,
        bundle: result,
      },
    });
  };
};
