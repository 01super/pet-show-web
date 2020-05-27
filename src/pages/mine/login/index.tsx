import Taro from "@tarojs/taro";
import { View, Button } from "@tarojs/components";
import { user } from "../../../service/api";
import request from "../../../service";

function Home({ setIsLogin }) {
  const handleLogin = userInfo => {
    Taro.login({
      success(res) {
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
            if (loginRes.code === 200) {
              Taro.setStorageSync("userInfo", userInfo);
              Taro.setStorageSync("token", loginRes.object);
              request({
                url: user.updateUserInfo,
                method: "PUT",
                data: userInfo
              });
              setIsLogin(true);
            }
          }
        });
      }
    });
  };

  const handleGetUserInfo = info => {
    console.log(info);
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
