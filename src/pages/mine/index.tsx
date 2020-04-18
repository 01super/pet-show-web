import Taro, { useState, FC } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import User from '../../components/user'
import Login from '../../components/login'
import './index.less'

const  Mine: FC = () => {
  const [isLogin, setIsLogin] = useState(Taro.getStorageSync('userInfo') ? true : false)
  const [num, setNum] = useState(1)
  return (
    <View className='mine page'>
      <View onClick={()=>setNum(num+1)}>{num}</View>
      <View className='login'>
        {isLogin ? <User /> : <Login setIsLogin={setIsLogin} />}
      </View>
      <View>
        <Text>Mine</Text>
      </View>
    </View>
  )
}

Mine.config = {
  navigationBarTitleText: '个人中心'
}

export default Mine