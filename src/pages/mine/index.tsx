import React, { useState, FC } from "react";
import { getStorageSync, clearStorageSync, showToast } from "@tarojs/taro";
import { View, Navigator, Button } from "@tarojs/components";
import User from "./user";
import Login from "./login";
import "./index.less";

const Mine: FC = () => {
  const [isLogin, setIsLogin] = useState(
    getStorageSync("userInfo") ? true : false
  );

  const logout = () => {
    clearStorageSync();
    setIsLogin(false);
    showToast({
      title: "注销成功",
      icon: "success",
      duration: 1000,
    });
  };

  return (
    <View className="mine page">
      <View className="login">
        {isLogin ? <User /> : <Login setIsLogin={setIsLogin} />}
      </View>
      <View className="menu">
        <Navigator className="menu-item">我的帖子</Navigator>
        <Navigator className="menu-item">精选</Navigator>
        <Navigator className="menu-item">设置</Navigator>
        <Button onClick={logout}>退出登录</Button>
      </View>
    </View>
  );
};

export default Mine;
