/* eslint-disable import/no-extraneous-dependencies */

import axios from "axios";

axios.defaults.httpAgent = { rejectUnauthorized: false };

const axiosInstance = axios.create({
  // baseURL: "http://localhost:5003/api",
  baseURL: "https://travel-api-tau.vercel.app/api",
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Network request failed:", error);
    return Promise.reject(error);
  }
);

export const request = axiosInstance;