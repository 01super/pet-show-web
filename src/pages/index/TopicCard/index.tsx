import React from 'react'
import { View, Text, Image } from '@tarojs/components'
import zan from '../../../assets/img/zan.png'
import zanActive from '../../../assets/img/zan-a.png'
import './style.less'

interface Props {
  data: Topic;
}

const TopicCard: React.FC<Props> = ({ data }) => {
  console.log('data: ', data);
  const { isLike, pictureList, title, value, userNickName, likeNum, userAvatarUrl, commentList } = data;
  return (
    <View className='TopicCard'>
      <View className="header">
        <Text className="userName">{userNickName}</Text>
        <Image className="userAvatar" mode="aspectFill" src={userAvatarUrl} />
      </View>
      <Text className="title">{title}</Text>
      {pictureList.map((src) => <Image className="picture" mode="scaleToFill" src={'http://139.199.65.134:8080' + src} />)}
      <Text className="content">{value}</Text>
      <View className="foot">
        <Text className="comment"><Image className="icon" src="../../../assets/img/comment.png" />{commentList.length}</Text>
        <Text className="like" > <Image className="icon" src={isLike ? zanActive : zan} /> {likeNum}</Text>
      </View>
    </View>
  )

}

export default TopicCard
