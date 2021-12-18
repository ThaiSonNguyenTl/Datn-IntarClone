import React, {useEffect, useState} from 'react';
import axios from "axios";

import "./conversation.css";

const Conversation = ({conversation, currentUser}) => {
  const [userFriend, setUserFriend] = useState(null);

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axios.get(`/api/user/userById/${friendId}`);
        setUserFriend(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src={userFriend?.user?.avatar}
        alt=""
      />
      <span className="conversationName">{userFriend?.user?.username}</span>
    </div>
  );
};

export default Conversation;
