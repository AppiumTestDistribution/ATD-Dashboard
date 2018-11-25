import { apiClient } from "../../service";
import {
  TRANSFORM_TEST_RESULT,
  FETCH_TEST_RESULT,
  NAME,
  GENERATE_CHART_DATA,
  FETCH_RUNNER_DETAIL
} from "./constant";
import {
  apiResponseAdapter,
  generateChartData,
  generateEnvInfo
} from "../../helper";

const handleSuccess = (type, payload) => ({
  type,
  payload
});

export const fetchDashboardData = () => async dispatch => {
  try {
    const result = await apiClient.fetchDashboardData();
    dispatch(handleSuccess(FETCH_TEST_RESULT, result));
    const transformedResponse = apiResponseAdapter(result);
    dispatch(handleSuccess(TRANSFORM_TEST_RESULT, transformedResponse));
  } catch (error) {
    console.log(error);
  }
};

export const fetchChartData = () => async (dispatch, getState) => {
  try {
    const { originalResponse } = getState()[NAME];
    const chartData = generateChartData(originalResponse);
    dispatch(handleSuccess(GENERATE_CHART_DATA, chartData));
  } catch (error) {
    console.log(error);
  }
};

export const fetchRunnerDetail = () => async dispatch => {
  try {
    const response = await apiClient.fetchRunnerDetail();
    const data = generateEnvInfo(response);
    dispatch(handleSuccess(FETCH_RUNNER_DETAIL, data));
  } catch (error) {
    console.log(error);
  }
};
