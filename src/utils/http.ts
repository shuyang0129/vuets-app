import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { Message } from "element-ui";
import router from "@/router";

const service = axios.create({
  timeout: 10000
});

// Add a request interceptor
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // Do something before request is sent
    if (localStorage.tsToken) {
      config.headers.Authorization = localStorage.tsToken;
    }
    return config;
  },
  (err: any) => {
    // Do something with request error
    return Promise.reject(err);
  }
);

// Add a response interceptor
service.interceptors.response.use(
  (response: AxiosResponse) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  (err: any) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    let errMsg = "";
    if (err && err.response.status) {
      switch (err.response.status) {
        case 401:
          errMsg = "登录状态失效，请重新登录";
          localStorage.removeItem("tsToken");
          router.push("/login");
          break;
        case 403:
          errMsg = "拒绝访问";
          break;

        case 408:
          errMsg = "请求超时";
          break;

        case 500:
          errMsg = "服务器内部错误";
          break;

        case 501:
          errMsg = "服务未实现";
          break;

        case 502:
          errMsg = "网关错误";
          break;

        case 503:
          errMsg = "服务不可用";
          break;

        case 504:
          errMsg = "网关超时";
          break;

        case 505:
          errMsg = "HTTP版本不受支持";
          break;

        default:
          errMsg = err.response.data.msg;
          break;
      }
    } else {
      errMsg = err;
    }
    Message.error(errMsg);
    return Promise.reject(err);
  }
);

export default service;
