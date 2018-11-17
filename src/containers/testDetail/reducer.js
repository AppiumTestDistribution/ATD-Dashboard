import { handleActions } from "redux-actions";
import update from "immutability-helper";
import { GENERATE_DEVICE_INFO } from "./constant";

const initialState = {
  deviceInfo: [],
  loading: false
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
      })
  },
  initialState
);
