import React, { Component } from 'react'
import { View } from '@tarojs/components'
import TopicCard from './TopicCard'
import { topic } from '../../service/api'
import request from '../../service'
import './index.less'

class Index extends Component {

  state = {
    topicList: [],
  }

  componentDidMount() {
    request({
      url: topic.queryList
    }).then(res => {
      if (res.code === 200) {
        this.setState({ topicList: res.object })
      }
    })
  }

  render() {
    const { topicList } = this.state
    return (
      <View className='index'>
        {topicList.map((topic => <TopicCard data={topic} />))}
      </View>
    )
  }
}


export default Index 
