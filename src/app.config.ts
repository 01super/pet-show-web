export default {
  pages: ["pages/index/index", "pages/mine/index", "pages/publish/index"],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
  tabBar: {
    list: [
      {
        pagePath: "pages/index/index",
        text: "首页",
        iconPath: "./assets/home.png",
        selectedIconPath: "./assets/home-active.png",
      },
      {
        pagePath: "pages/publish/index",
        text: "发布",
        iconPath: "./assets/home.png",
        selectedIconPath: "./assets/home-active.png",
      },
      {
        pagePath: "pages/mine/index",
        text: "我的",
        iconPath: "./assets/user.png",
        selectedIconPath: "./assets/user-active.png",
      },
    ],
  },
};
