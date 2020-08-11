export const user = {
  login: '/user/authorize',
  updateUserInfo: '/user/updateUserInfo'
}

export const topic = {
  queryList: '/topic/selectTopicList',
  addTopic: '/topic/addTopicInfo',
  operateTopic: '/topic/operateTopic',  // 帖子点赞
  deleteTopic: '/topic/deleteTopicInfo'  // 删除帖子
}

export const upload = 'http://139.199.65.134:8080/file/upload'

export default user
