import React, { useState } from "react";
import { View, Text, Image } from "@tarojs/components";
import zan from "../../../assets/zan.png";
import zanActive from "../../../assets/zan-a.png";
import comment from "../../../assets/comment.png";
import "./style.less";

interface Props {
  data: Topic;
}

const TopicCard: React.FC<Props> = ({ data }) => {
  const {
    isLike,
    pictureList,
    title,
    value,
    userNickName,
    likeNum,
    userAvatarUrl,
    commentList,
  } = data;

  const [isShow, setShow] = useState(-1);

  function handleShow(index: number) {
    setShow((pre) => (pre === -1 ? index : -1));
  }
  return (
    <View className="TopicCard">
      <View className="header">
        <Text className="userName">{userNickName}</Text>
        <Image className="userAvatar" mode="aspectFill" src={userAvatarUrl} />
      </View>
      <Text className="title">{title}</Text>
      {pictureList.map((src, index) => (
        <Image
          onClick={() => handleShow(index)}
          className={isShow === index ? "picture-active" : "picture"}
          mode="aspectFit"
          key={src}
          src={"http://139.199.65.134:8080" + src}
        />
      ))}
      <Text className="content">{value}</Text>
      <View className="foot">
        <View className="comment">
          <Image className="icon" src={comment} />
          {commentList.length}
        </View>
        <View className="like">
          <Image className="icon" src={isLike ? zanActive : zan} /> {likeNum}
        </View>
      </View>
    </View>
  );
};

export default TopicCard;
