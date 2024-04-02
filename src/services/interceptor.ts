import { InternalAxiosRequestConfig } from "axios";
import instance from "./axios";
import { Store } from "@reduxjs/toolkit";

const setUpInterceptor = (store: Store) => {
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = store.getState().auth?.token || "";
      const edited_response = config;
      edited_response.headers["Authorization"] = token;
      return edited_response;
    },
    (error) => {
      console.log(error.response.status);
      Promise.reject(error);
    }
  );
};

export default setUpInterceptor;
