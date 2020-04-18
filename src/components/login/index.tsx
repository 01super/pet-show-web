import Taro from '@tarojs/taro'
import { View, Button } from '@tarojs/components'

function Home({setIsLogin}) {
  console.log('login render')
  const handleGetUserInfo = (info) => {
    console.log(info)
    Taro.setStorageSync('userInfo', info.detail.userInfo)
    setIsLogin(true)
  }

  return (
    <View>
      <Button type='primary' openType='getUserInfo' onGetUserInfo={handleGetUserInfo}>微信登录</Button>
    </View>
  )
}

export default Home