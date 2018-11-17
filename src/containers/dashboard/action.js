import { apiClient } from "../../service";
import { TRANSFORM_TEST_RESULT, FETCH_TEST_RESULT } from "./constant";
import { apiResponseAdapter } from "../../helper";

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
