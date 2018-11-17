import { GENERATE_DEVICE_INFO } from "./constant";
import { NAME } from "../dashboard/constant";
import { generateDeviceInfo } from "../../helper";

const handleSuccess = (type, payload) => ({
  type,
  payload
});

export const fetchDeviceInfo = udid => async (dispatch, getState) => {
  try {
    const { originalResponse } = getState()[NAME];
    const deviceInfo = generateDeviceInfo(originalResponse, udid);
    dispatch(handleSuccess(GENERATE_DEVICE_INFO, deviceInfo));
  } catch (error) {
    console.log(error);
  }
};
