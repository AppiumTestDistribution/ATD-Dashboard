import { handleActions } from "redux-actions";
import update from "immutability-helper";
import { FETCH_TEST_RESULT } from "./constant";

const initialState = {
  testResult: [],
  loading: false
};

export default handleActions(
  {
    [FETCH_TEST_RESULT]: (state, { payload }) =>
      update(state, {
        testResult: {
          $set: payload
        },
        loading: {
          $set: false
        }
      })
  },
  initialState
);
