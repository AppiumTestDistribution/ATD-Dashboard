import { apiClient } from "../service";
import {
  TRANSFORM_TEST_RESULT,
  FETCH_TEST_RESULT,
  NAME,
  GENERATE_DEVICE_INFO
} from "./constant";
import { apiResponseAdapter, generateDeviceInfo } from "../helper";

const handleSuccess = (type, payload) => ({
  type,
  payload
});

export const fetchTestResult = () => async dispatch => {
  try {
    const result = await apiClient();
    dispatch(handleSuccess(FETCH_TEST_RESULT, result));
    const transformedResponse = apiResponseAdapter(result);
    dispatch(handleSuccess(TRANSFORM_TEST_RESULT, transformedResponse));
  } catch (error) {
    console.log(error);
  }
};

export const fetchDeviceInfo = udid => async (dispatch, getState) => {
  try {
    const { originalResponse } = getState()[NAME];
    const deviceInfo = generateDeviceInfo(originalResponse, udid);
    dispatch(handleSuccess(GENERATE_DEVICE_INFO, deviceInfo));
  } catch (error) {
    console.log(error);
  }
};
