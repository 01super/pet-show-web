import React, { useState } from 'react'
import Taro, { chooseImage } from '@tarojs/taro'
import { View, Button, Input, Text, Image, Textarea } from '@tarojs/components'
import { topic, upload } from '../../service/api'
import request from '../../service'
import './style.less'

const Publish = () => {
  const [files, setFiles] = useState<string[]>([])
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')

  const handlePickImg = () => {
    chooseImage({
      // count: 9, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有，在H5浏览器端支持使用 `user` 和 `environment`分别指定为前后摄像头
    }).then(res => {
      console.log('res: ', res);
      if (res.errMsg === "chooseImage:ok") {
        setFiles(pre => {
          const arr = new Set([...pre, ...res.tempFilePaths])
          return Array.from(arr)
        })
      }
    })
  }

  const uploadFile = async () => {
    const promises: Promise<any>[] = []
    files.forEach(file => {
      const _p = new Promise((resolve) => {
        Taro.uploadFile({
          url: upload,
          name: 'file',
          filePath: file,
          formData: {
            addressType: 1,
            type: 0
          },
          header: {
            'content-type': 'multipart/form-data',
            authorize: Taro.getStorageSync('token')
          }
        }).then(res => {
          const data = JSON.parse(res.data)
          if (res.statusCode === 200 && data.code === 200) {
            resolve(data.object)
          }
        })
      })
      promises.push(_p)
    })
    Promise.all(promises).then(res => {
      request({
        url: topic.addTopic,
        method: 'POST',
        data: {
          title,
          value: content,
          pictureList: res
        }
      }).then(res => {
        console.log(res);
      })
    })
  }

  return (
    <View className='publish'>
      <View className='title'>
        <Text>标题：</Text>
        <Input value={title} onInput={e => { setTitle(e.detail.value) }} maxlength={20} type='text' placeholder='请输入标题' />
      </View>
      <View className="pick-wrap">
        {files.map(file => <View className="img-wrap"><Image mode="aspectFit" className="img" src={file} /><Text className="close">x</Text></View>)}
        {files.length < 9 && <View className="img-pick" onClick={handlePickImg}>+</View>}
      </View>
      <Text>
        {files.toString()}
      </Text>
      <View>
        <Text>内容：</Text>
        <Textarea value={content} onInput={val => { setContent(val.detail.value) }} maxlength={100} placeholder='请输入内容' />
      </View>
      <View>
        <Button onClick={uploadFile}>上传</Button>
        <Button onClick={() => Taro.navigateBack()}>返回</Button>
      </View>
    </View>
  )

}

Publish.config = {
  navigationBarTitleText: '发布'
}
export default Publish
