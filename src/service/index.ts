import {
  request,
  getStorageSync,
  clearStorageSync,
  switchTab,
  showToast,
} from "@tarojs/taro";

const baseUrl = "https://52star.net";

export const formatNumber = (n: number | string): string => {
  n = n.toString();
  return n[1] ? n : "0" + n;
};

export const formatTime = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return (
    [year, month, day].map(formatNumber).join("-") +
    " " +
    [hour, minute, second].map(formatNumber).join(":")
  );
};

const logError = (name: string, action: string, info?: string | object) => {
  if (!info) {
    info = "empty";
  }
  const time = formatTime(new Date());
  if (typeof info === "object") {
    info = JSON.stringify(info);
  }
  console.error(time, name, action, info);
};

export default function (params: request.Option): Promise<Response> {
  let { url, method = "GET", header = {} } = params;
  if (method === "POST") {
    header["content-type"] = "application/x-www-form-urlencoded";
  } else {
    header["content-type"] = "application/json";
  }
  const token = getStorageSync("token");
  if (token) header["authorize"] = token;
  if (!url.includes("http://")) url = baseUrl + url;
  const option: request.Option = {
    ...params,
    url,
    method,
    header,
  };
  return request(option)
    .then(({ data }) => {
      console.log("res.statusCode: ", data);
      if (data.code === 400) {
        clearStorageSync();
        switchTab({
          url: "/pages/mine/index",
        });
        showToast({
          title: "请先登录",
          icon: "none",
          duration: 1000,
        });
      }
      return data as Response;
    })
    .catch((err) => {
      logError("api", err);
      return {} as Response;
    });
}
