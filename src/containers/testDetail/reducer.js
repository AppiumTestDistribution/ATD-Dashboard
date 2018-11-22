import { handleActions } from "redux-actions";
import update from "immutability-helper";
import { GENERATE_DEVICE_INFO, FETCH_ERROR_SCREENSHOT } from "./constant";

const initialState = {
  deviceInfo: [],
  loading: false,
  errorScreenshot: ""
};

export default handleActions(
  {
    [GENERATE_DEVICE_INFO]: (state, { payload }) =>
      update(state, {
        deviceInfo: {
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
      })
  },
  initialState
);
