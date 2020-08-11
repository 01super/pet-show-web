import React from "react";
import { View, Button } from "@tarojs/components";
import { login, setStorageSync } from '@tarojs/taro'
import { user } from "../../../service/api";
import request from "../../../service";

function Home({ setIsLogin }) {
  const handleLogin = userInfo => {
    login({
      success(res) {
        console.log('res: ', res);
        request({
          url: user.login,
          data: {
            code: res.code
            // ...userInfo
          },
          header: {
            "content-type": "application/x-www-form-urlencoded"
          },
          method: "POST",
          success(loginRes) {
            console.log("loginRes", loginRes);
            if (loginRes.data.code === 200) {
              setStorageSync("userInfo", userInfo);
              setStorageSync("token", loginRes.data.object);
              request({
                url: user.updateUserInfo,
                method: "PUT",
                data: userInfo,
                header: {
                  "content-type": "application/x-www-form-urlencoded"
                },
              });
              setIsLogin(true);
            }
          }
        });
      }
    });
  };

  const handleGetUserInfo = info => {
    if (info.detail.errMsg === "getUserInfo:ok") {
      handleLogin(info.detail.userInfo);
    }
  };

  return (
    <View>
      <Button
        type="primary"
        openType="getUserInfo"
        onGetUserInfo={handleGetUserInfo}
      >
        微信登录
      </Button>
    </View>
  );
}

export default Home;
