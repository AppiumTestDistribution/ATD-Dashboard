import { handleActions } from "redux-actions";
import update from "immutability-helper";
import {
  GENERATE_TEST_RUNNER_DETAIL,
  FETCH_ERROR_SCREENSHOT,
  GENERATE_DEVICE_INFO
} from "./constant";

const initialState = {
  testRunnerDetail: [],
  loading: false,
  errorScreenshot: "",
  deviceInfo: []
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
      })
  },
  initialState
);
