import axios from "axios";
import { config } from "../config";

const { service } = config[process.env.REACT_APP_ENVIRONMENT];

const { dashboard, env } = service;

const getDashboardUrl = () => {
  return process.env.REACT_APP_API_URL === "N"
    ? "apiResponse.json"
    : `${dashboard.hostname}:${dashboard.port}/testresults`;
};

const getEnvUrl = () => {
  return process.env.REACT_APP_API_URL === "N"
    ? "env.json"
    : `${env.hostname}:${env.port}/envInfo`;
};

export const apiClient = {
  fetchDashboardData: async () => {
    try {
      const response = await axios({
        url: getDashboardUrl(),
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
      const response = await axios.get(url, {
        responseType: "arraybuffer"
      });
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
        url: getEnvUrl(),
        method: "GET",
        mode: "cors"
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  }
};
