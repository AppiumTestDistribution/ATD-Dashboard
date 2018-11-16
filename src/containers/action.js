import { apiClient } from "../service";
import { FETCH_TEST_RESULT } from "./constant";
import { apiResponseAdapter } from "../helper/apiResponseAdapter";

const handleSuccess = (type, payload) => ({
  type,
  payload
});

export const fetchTestResult = () => async dispatch => {
  try {
    const result = await apiClient();
    const transformedResponse = apiResponseAdapter(result);
    dispatch(handleSuccess(FETCH_TEST_RESULT, transformedResponse));
  } catch (error) {
    console.log(error);
  }
};
