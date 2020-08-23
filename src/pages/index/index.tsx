import React, { useState, useEffect } from "react";
import { usePullDownRefresh } from "@tarojs/taro";
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
    }
  };

  useEffect(() => {
    queryData();
  }, []);

  usePullDownRefresh(() => {
    queryData();
  });

  return (
    <View className="index">
      {topicList.map((topic) => (
        <TopicCard data={topic} />
      ))}
    </View>
  );
};

export default Index;
