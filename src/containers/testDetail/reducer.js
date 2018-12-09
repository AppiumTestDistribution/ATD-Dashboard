import { handleActions } from "redux-actions";
import update from "immutability-helper";
import {
  GENERATE_TEST_RUNNER_DETAIL,
  FETCH_ERROR_SCREENSHOT,
  GENERATE_DEVICE_INFO,
  GENERATE_TEST_RESULT_CHART_DATA,
  FETCH_CAPTURED_SCREENSHOTS
} from "./constant";

const initialState = {
  testRunnerDetail: [],
  loading: false,
  errorScreenshot: "",
  deviceInfo: [],
  testResultChartData: [],
  capturedScreenshots: []
};

export default handleActions(
  {
    [GENERATE_TEST_RUNNER_DETAIL]: (state, { payload }) =>
      update(state, {
        testRunnerDetail: {
          $set: payload
        },
        loading: {
          $set: false
        }
      }),
    [FETCH_ERROR_SCREENSHOT]: (state, { payload }) =>
      update(state, {
        errorScreenshot: {
          $set: payload
        },
        loading: {
          $set: false
        }
      }),
    [GENERATE_DEVICE_INFO]: (state, { payload }) =>
      update(state, {
        deviceInfo: {
          $set: payload
        },
        loading: {
          $set: false
        }
      }),
    [GENERATE_TEST_RESULT_CHART_DATA]: (state, { payload }) =>
      update(state, {
        testResultChartData: {
          $set: payload
        },
        loading: {
          $set: false
        }
      }),
    [FETCH_CAPTURED_SCREENSHOTS]: (state, { payload }) =>
      update(state, {
        capturedScreenshots: {
          $set: payload
        },
        loading: {
          $set: false
        }
      })
  },
  initialState
);
