import Taro, { useState, chooseImage } from '@tarojs/taro'
import { View, Button, Input, Text, Image, Textarea } from '@tarojs/components'
import { topic, upload } from '../../service/api'
import request from '../../service'
import zan from '../../../assets/img/zan.png'
import zanActive from '../../../assets/img/zan-a.png'
import './style.less'
/**
 * 
commentList: []
createTime: "2020-05-28 23:07:53"
dislikeNum: null
id: 1
isDislike: null
isLike: null
likeNum: null
pictureList: []
status: 0
title: "123"
updateTime: "2020-05-28 23:07:53"
userAvatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIHx7Kyuiag4nhzeJILvR3eKzial6DA5H7ibCm4kWIdFibTGsl1icAOqO6ZX5jfSfvnDib83U5dKibbO509A/132"
userId: 1
userNickName: "01super"
value: "4567"
 */
const TopicCard = ({ data = {} }) => {
  console.log('data: ', data);
  const { isLike, pictureList, title, value, userNickName, likeNum, userAvatarUrl, commentList } = data;
  return (
    <View className='TopicCard'>
      <View className="header">
        <Text className="userName">{userNickName}</Text>
        <Image className="userAvatar" mode="aspectFill" src={userAvatarUrl} />
      </View>
      <Text className="title">{title}</Text>
      {pictureList.map((src) => <Image className="picture" mode="scaleToFill" src={'http://139.199.65.134:8080'+src} />)}
      <Text className="content">{value}</Text>
      <View className="foot">
        <Text className="comment"><Image className="icon" src="../../../assets/img/comment.png" />{commentList.length}</Text>
        <Text className="like" > <Image className="icon" src={isLike ? zanActive : zan} /> {likeNum}</Text>
      </View>
    </View>
  )

}

export default TopicCard
