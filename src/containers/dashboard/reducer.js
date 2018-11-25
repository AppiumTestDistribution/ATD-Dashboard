import { handleActions } from "redux-actions";
import update from "immutability-helper";
import {
  FETCH_TEST_RESULT,
  TRANSFORM_TEST_RESULT,
  GENERATE_CHART_DATA,
  FETCH_RUNNER_DETAIL
} from "./constant";

const initialState = {
  originalResponse: [],
  testResult: [],
  loading: false,
  chartData: [],
  envInfo: []
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
      }),
    [GENERATE_CHART_DATA]: (state, { payload }) =>
      update(state, {
        chartData: {
          $set: payload
        },
        loading: {
          $set: false
        }
      }),
    [FETCH_RUNNER_DETAIL]: (state, { payload }) =>
      update(state, {
        envInfo: {
          $set: payload
        },
        loading: {
          $set: false
        }
      })
  },
  initialState
);
