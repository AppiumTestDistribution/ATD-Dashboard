import axios from "axios";

export const apiClient = {
  fetchDashboardData: async () => {
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
  },
  fetchScreenshot: async url => {
    try {
      const response = await axios.get(url, { responseType: "arraybuffer" });
      const base64 = btoa(
        new Uint8Array(response.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
      return "data:;base64," + base64;
    } catch (error) {
      throw error;
    }
  },
  fetchRunnerDetail: async () => {
    try {
      const response = await axios({
        url: "env.json",
        method: "GET",
        mode: "cors"
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  }
};
