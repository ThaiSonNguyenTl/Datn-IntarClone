// import axios from "axios";
// import { useEffect, useState } from "react";
import React from 'react';
import "./conversation.css";

const Conversation = () => {
  // const [user, setUser] = useState(null);
  // const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  // useEffect(() => {
  //   const friendId = conversation.members.find((m) => m !== currentUser._id);

  //   const getUser = async () => {
  //     try {
  //       const res = await axios("/users?userId=" + friendId);
  //       setUser(res.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   getUser();
  // }, [currentUser, conversation]);

  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3hu_smBC3wsM_TWbxzRSimTRDwaKFahyWWA&usqp=CAU"
        alt=""
      />
      {/* <span className="conversationName">{user?.username}</span> */}
      <span className="conversationName">John</span>
    </div>
  );
};

export default Conversation;
