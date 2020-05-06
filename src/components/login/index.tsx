import Taro from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import { login } from '../../service/api'

function Home({setIsLogin}) {

  const handleLogin = userInfo => {
    Taro.login({
      success(res) {
        console.log(res)
        Taro.request({
          url: login,
          data: {
            code: res.code,
            ...userInfo
          },
          method: "POST",
          success(loginRes) {
            if(loginRes) {
              Taro.setStorageSync('userInfo', loginRes)
              // setIsLogin(true)
            }
          }
        })
      }
    })
  }

  const handleGetUserInfo = (info) => {
    console.log(info)
    if(info.detail.errMsg === "getUserInfo:ok") {
      handleLogin(info.detail.userInfo)
    }
  }

  return (
    <View>
      <Button type='primary' openType='getUserInfo' onGetUserInfo={handleGetUserInfo}>微信登录</Button>
    </View>
  )
}

export default Home
