import {
  GENERATE_TEST_RUNNER_DETAIL,
  FETCH_ERROR_SCREENSHOT,
  GENERATE_DEVICE_INFO,
  GENERATE_TEST_RESULT_CHART_DATA,
  FETCH_CAPTURED_SCREENSHOTS
} from "./constant";
import { NAME } from "../dashboard/constant";
import {
  generateTestRunnerDetail,
  generateDeviceInfo,
  generateTestResultChartData
} from "../../helper";
import { apiClient } from "../../service";

const handleSuccess = (type, payload) => ({
  type,
  payload
});

export const fetchTestRunnerDetail = udid => async (dispatch, getState) => {
  try {
    const { originalResponse } = getState()[NAME];
    const runnerDetail = generateTestRunnerDetail(originalResponse, udid);
    dispatch(handleSuccess(GENERATE_TEST_RUNNER_DETAIL, runnerDetail));
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

export const fetchDeviceInfo = udid => async (dispatch, getState) => {
  try {
    const { originalResponse } = getState()[NAME];
    const deviceInfo = generateDeviceInfo(originalResponse, udid);
    dispatch(handleSuccess(GENERATE_DEVICE_INFO, deviceInfo));
  } catch (error) {
    console.log(error);
  }
};

export const fetchChartData = udid => async (dispatch, getState) => {
  try {
    const { originalResponse } = getState()[NAME];
    const chartData = generateTestResultChartData(originalResponse, udid);
    dispatch(handleSuccess(GENERATE_TEST_RESULT_CHART_DATA, chartData));
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllCapturedScreenshots = screenshots => async dispatch => {
  const capturedScreenshots = [];
  try {
    const screenshotsUrl = Object.values(screenshots)[0];
    for (var urlKey in screenshotsUrl) {
      const key = urlKey;
      const screenshot = await apiClient.fetchScreenshot(
        screenshotsUrl[urlKey]
      );
      capturedScreenshots.push({ key, screenshot });
    }
    dispatch(handleSuccess(FETCH_CAPTURED_SCREENSHOTS, capturedScreenshots));
  } catch (error) {
    console.log(error);
  }
};
