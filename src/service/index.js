import axios from "axios";

export const apiClient = async () => {
  try {
    const response = await axios({
      url: "apiResponse.json",
      method: "GET",
      mode: "cors"
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};
