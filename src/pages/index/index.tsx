import React, { useState, useEffect } from "react";
import {
  usePullDownRefresh,
  onAppShow,
  stopPullDownRefresh,
  startPullDownRefresh,
} from "@tarojs/taro";
import { View } from "@tarojs/components";
import TopicCard from "./TopicCard";
import { queryTopicList } from "../../service/api";
import "./index.less";

const Index: React.FC = () => {
  const [topicList, setTopicList] = useState<Topic[]>([]);

  const queryData = async () => {
    const res = await queryTopicList();
    if (res.code === 200) {
      setTopicList(res.object);
      console.log("res.object: ", res.object);
    }
  };

  useEffect(() => {
    queryData();
  }, []);

  usePullDownRefresh(() => {
    startPullDownRefresh();
    console.log(9999);
    queryData();
    stopPullDownRefresh();
  });

  return (
    <View className="index">
      {topicList.map((topic) => (
        <TopicCard data={topic} key={topic.userAvatarUrl} />
      ))}
    </View>
  );
};

export default Index;
