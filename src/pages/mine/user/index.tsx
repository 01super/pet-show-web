import Taro from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import './index.less'

function Home() {
  const userInfo = Taro.getStorageSync('userInfo')
  return (
    <View className='user'>
      <Image className='avatar' src={userInfo.avatarUrl} />
      <Text className='nickname'>{userInfo.nickName}</Text>
    </View>
  )
}

export default Home