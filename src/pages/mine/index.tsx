import Taro, { useState, FC } from '@tarojs/taro'
import { View, Navigator } from '@tarojs/components'
import User from './user'
import Login from './login'
import './index.less'

const  Mine: FC = () => {
  const [isLogin, setIsLogin] = useState(Taro.getStorageSync('userInfo') ? true : false)
  return (
    <View className='mine page'>
      <View className='login'>
        {isLogin ? <User /> : <Login setIsLogin={setIsLogin} />}
      </View>
      <View className='menu'>
        <Navigator className='menu-item'>我的帖子</Navigator>
        <Navigator className='menu-item'>精选</Navigator>
        <Navigator className='menu-item'>设置</Navigator>
      </View>
    </View>
  )
}

Mine.config = {
  navigationBarTitleText: '个人中心'
}

export default Mine
