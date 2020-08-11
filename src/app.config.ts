export default {
  pages: ["pages/index/index",
    "pages/mine/index", "pages/publish/index"
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "萌宠秀",
    navigationBarTextStyle: "black",
  },
  tabBar: {
    list: [
      {
        pagePath: "pages/index/index",
        text: "首页",
        iconPath: "./assets/img/home.png",
        selectedIconPath: "./assets/img/home-active.png",
      },
      {
        pagePath: "pages/publish/index",
        text: "发布",
        iconPath: "./assets/img/home.png",
        selectedIconPath: "./assets/img/home-active.png",
      },
      {
        pagePath: "pages/mine/index",
        text: "我的",
        iconPath: "./assets/img/user.png",
        selectedIconPath: "./assets/img/user-active.png",
      },
    ],
  },
};
