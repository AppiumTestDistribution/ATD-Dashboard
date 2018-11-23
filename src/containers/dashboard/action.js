import { apiClient } from "../../service";
import {
  TRANSFORM_TEST_RESULT,
  FETCH_TEST_RESULT,
  NAME,
  GENERATE_CHART_DATA
} from "./constant";
import { apiResponseAdapter, generateChartData } from "../../helper";

const handleSuccess = (type, payload) => ({
  type,
  payload
});

export const fetchTestResult = () => async dispatch => {
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
