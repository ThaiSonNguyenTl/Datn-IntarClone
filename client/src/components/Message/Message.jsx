import React from "react";
import "./message.css";
// import { format } from "timeago.js";

const Message = ({own}) => {
  return (
    <div className={own? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3hu_smBC3wsM_TWbxzRSimTRDwaKFahyWWA&usqp=CAU"
          alt=""
        />
        <p className="messageText">This is Message</p>
      </div>
      {/* <div className="messageBottom">{format(message.createdAt)}</div> */}
      <div className="messageBottom">1 hour ago</div>
    </div>
  );
}

export default Message;
