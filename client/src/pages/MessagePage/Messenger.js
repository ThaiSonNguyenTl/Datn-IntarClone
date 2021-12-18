import React, { useEffect, useState, useRef } from "react";
import "./messenger.css";
import Conversation from "../../components/Conversations/Conversation";
import Message from "../../components/Message/Message";
import { connect } from "react-redux";
// import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/userSelectors";
import Icon from "../../components/Icon/Icon";
import axios from "axios";
import { connectSocket } from '../../redux/socket/socketActions';

const Messenger = ({ currentUser, socket, connectSocket }) => {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  // const [arrivalMessage, setArrivalMessage] = useState(null);

  const scrollRef = useRef();
  // const token = localStorage.getItem("token");

  // useEffect(() => {
  //   if (token) {
  //     connectSocket();
  //   }
  // }, [connectSocket, token]);
  // console.log("socketIO", socket);

  // useEffect(() => {
  //   socket.on("getMessage", (data) => {
  //     setArrivalMessage({
  //       sender: data.senderId,
  //       text: data.text,
  //       createdAt: Date.now(),
  //     });
  //   });
  // }, []);
  // useEffect(() => {
  //   arrivalMessage &&
  //     currentChat?.members.includes(arrivalMessage.sender) &&
  //     setMessages((prev) => [...prev, arrivalMessage]);
  // }, [arrivalMessage, currentChat]);

  // useEffect(() => {
  //   socket.emit("addUser", currentUser._id);
  //   socket.on("getUsers", (users) => {
  //     console.log(users);
  //   });
  // }, [currentUser]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("/api/conversations/" + currentUser._id);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [currentUser._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("/api/messages/" + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: currentUser._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    // const receiverId = currentChat.members.find(
    //   (member) => member !== currentUser._id
    // );

    // socket.emit("sendMessage", {
    //   senderId: currentUser._id,
    //   receiverId,
    //   text: newMessage,
    // });

    try {
      const res = await axios.post("/api/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <section className="messenger-page">
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <span className="userName">{currentUser.username}</span>
            <hr style={{ color: "#cccc" }} />
            <div className="chatBoxTop">
              {conversations.map((conversation) => (
                <div onClick={() => setCurrentChat(conversation)}>
                  <Conversation
                    conversation={conversation}
                    currentUser={currentUser}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((msg) => (
                    <div key={msg._id} ref={scrollRef}>
                      <Message
                        message={msg}
                        own={msg.sender === currentUser._id}
                      />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <input
                    className="chatMessageInput"
                    placeholder="Message..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></input>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                <Icon className="icon--button" icon="paper-plane-outline" />
                Your message <br />
                Send photos and private messages to friends or groups
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  socket: state.socket.socket,
  currentUser: selectCurrentUser(state),
});

const mapDispatchToProps = (dispatch) => ({
  connectSocket: () => dispatch(connectSocket()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Messenger);
