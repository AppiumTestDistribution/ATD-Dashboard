import { handleActions } from "redux-actions";
import update from "immutability-helper";
import { FETCH_TEST_RESULT, TRANSFORM_TEST_RESULT } from "./constant";

const initialState = {
  originalResponse: [],
  testResult: [],
  loading: false
};

export default handleActions(
  {
    [FETCH_TEST_RESULT]: (state, { payload }) =>
      update(state, {
        originalResponse: {
          $set: payload
        },
        loading: {
          $set: false
        }
      }),
    [TRANSFORM_TEST_RESULT]: (state, { payload }) =>
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
