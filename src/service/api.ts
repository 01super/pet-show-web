import request from "./index";

export const user = {
  login: "/user/authorize",
  updateUserInfo: "/user/updateUserInfo",
};

export const topic = {
  queryList: "/topic/selectTopicList",
  addTopic: "/topic/addTopicInfo",
  operateTopic: "/topic/operateTopic", // 帖子点赞
  deleteTopic: "/topic/deleteTopicInfo", // 删除帖子
};

export const queryTopicList = async (): Promise<Response<Topic[]>> =>
  request({ url: topic.queryList });

export const upload = "https://52star.net/file/upload";

export default user;
