import {ComponentClass} from 'react'
import Taro, {Component, Config} from '@tarojs/taro'
import {AtImagePicker} from 'taro-ui'
import {View, Button, Text, Navigator} from '@tarojs/components'
import {connect} from '@tarojs/redux'
import "../../../node_modules/taro-ui/dist/style/components/image-picker.scss";
import "../../../node_modules/taro-ui/dist/style/components/icon.scss";
import {add, minus, asyncAdd} from '../../actions/counter'
import { upload } from '../../service/api'

import './index.less'

// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion

type PageStateProps = {
  counter: {
    num: number
  }
}

type PageDispatchProps = {
  add: () => void
  dec: () => void
  asyncAdd: () => any
}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
  props: IProps
}

@connect(({counter}) => ({
  counter
}), (dispatch) => ({
  add() {
    dispatch(add())
  },
  dec() {
    dispatch(minus())
  },
  asyncAdd() {
    dispatch(asyncAdd())
  }
}))

class Index extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '首页'
  }

  state = {
    files: [],
  }

  fileChange(files) {
    this.setState({
      files
    })
  }

  uploadFile() {
    console.log(this.state.files)
    Taro.uploadFile({
      url: upload,
      name: 'img',
      filePath: this.state.files[0].url
    }).then(res => {
      console.log(res)
    })
  }

  render() {
    const {files} = this.state
    return (
      <View className='index'>
        <Button className='add_btn' onClick={this.props.add}>+</Button>
        <Button className='dec_btn' onClick={this.props.dec}>-</Button>
        <Button className='dec_btn' onClick={this.props.asyncAdd}>async</Button>
        <View><Text>{this.props.counter.num}</Text></View>
        <View><Text>Hello, World</Text></View>
        <AtImagePicker files={files} onChange={this.fileChange.bind(this)} />
        <Button onClick={this.uploadFile.bind(this)}>上传</Button>
        <Navigator url='/pages/publish/index'>发布</Navigator>
      </View>
    )
  }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default Index as ComponentClass<PageOwnProps, PageState>
