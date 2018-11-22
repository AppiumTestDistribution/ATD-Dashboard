import { GENERATE_DEVICE_INFO, FETCH_ERROR_SCREENSHOT } from "./constant";
import { NAME } from "../dashboard/constant";
import { generateDeviceInfo } from "../../helper";
import { apiClient } from "../../service";

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

export const fetchErrorScreenshot = url => async dispatch => {
  try {
    const errorScreenshot = await apiClient.fetchScreenshot(url);
    dispatch(handleSuccess(FETCH_ERROR_SCREENSHOT, errorScreenshot));
  } catch (error) {
    console.log(error);
  }
};
