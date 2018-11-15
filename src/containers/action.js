import { apiClient } from "../service";
import { FETCH_TEST_RESULT } from "./constant";

const handleSuccess = (type, payload) => ({
  type,
  payload
});

export const fetchTestResult = () => async dispatch => {
  try {
    const result = await apiClient();
    dispatch(handleSuccess(FETCH_TEST_RESULT, result));
  } catch (error) {
    console.log(error);
  }
};
