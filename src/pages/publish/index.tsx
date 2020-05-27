import Taro, {useState} from '@tarojs/taro'
import {AtImagePicker} from 'taro-ui'
import {File} from 'taro-ui/types/image-picker'
import {View, Button, Input} from '@tarojs/components'
import "../../../node_modules/taro-ui/dist/style/components/image-picker.scss";
import "../../../node_modules/taro-ui/dist/style/components/icon.scss";
import './style.less'

const Publish = () => {
  const [files, setFiles] = useState<File[]>([])
  const [content, setContent] = useState<string>('')

  const fileChange = (file: File[]) => {
    setFiles(file)
  }

  const handleInput = e => {
    const {value} = e.detail;
    console.log(value)
    setContent(value)
  }

  // const uploadFile = () => {
  //   Taro.uploadFile({
  //     url: upload,
  //     name: 'img',
  //     filePath: files[0].url,
  //     formData: {
  //       content
  //     }
  //   }).then(res => {
  //     console.log(res)
  //   })
  // }

  return (
    <View className='index'>
      <AtImagePicker files={files} onChange={fileChange} />
      <Input onInput={handleInput} maxLength={100} type='text' placeholder='请输入内容' />
      <View>
        {/*<Button onClick={uploadFile}>上传</Button>*/}
        <Button onClick={() => Taro.navigateBack()}>返回</Button>
      </View>
    </View>
  )

}

Publish.config = {
  navigationBarTitleText: '发布'
}
export default Publish
