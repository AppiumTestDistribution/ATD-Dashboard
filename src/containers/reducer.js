import { handleActions } from "redux-actions";
import update from "immutability-helper";
import {
  FETCH_TEST_RESULT,
  TRANSFORM_TEST_RESULT,
  GENERATE_DEVICE_INFO
} from "./constant";

const initialState = {
  originalResponse: [],
  testResult: [],
  loading: false,
  deviceInfo: []
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
