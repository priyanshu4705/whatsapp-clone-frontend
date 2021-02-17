import { Avatar, IconButton } from '@material-ui/core'
import { AttachFile, InsertEmoticonOutlined, Mic, MoreVert, SearchOutlined, Send } from '@material-ui/icons'
import React, { useState } from 'react'
import '../assets/chat.css'

function Chat() {

    const [input, setInput] = useState('');

    const sendMessage = async (e) => {
        e.preventDefault();
        setInput('');
    }

    return (
        <div className="chat">
            <div className="chat_header">
                <Avatar />
                <div className="chat_headerInfo">
                    <h3>Room name</h3>
                    <p>last seen at ...</p>
                </div>
                <div className="chat_headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>
            <div className="chat_body">
                {/* {messages.map(message => (
                    <p key={message.timestamp} className={`chat_message ${!message.recieved && "chat_reciever"}`}>
                        <span className="chat_name">{message.name}</span>
                        {message.message}
                        <span className="chat_time">{message.timestamp}</span>
                    </p>
                ))} */}

                <p key={1} className={`chat_message`}>
                    <span className="chat_name">Priyanshu</span>
                    Hello this is hard coded
                    <span className="chat_time">{new Date().toString().substring(16,24)}</span>
                </p>

                <p key={1} className={`chat_message chat_reciever`}>
                    <span className="chat_name">Priyanshu</span>
                    Hello this is hard coded
                    <span className="chat_time">{new Date().toString().substring(16, 24)}</span>
                </p>
            </div>
            <div className="chat_footer">
                <IconButton>
                    <AttachFile />
                </IconButton>
                <IconButton>
                    <InsertEmoticonOutlined />
                </IconButton>
                <form>
                    <input value={input}
                        onChange={(e) => setInput(e.target.value)}
                        type="text"
                        placeholder="Type a message" />
                    <IconButton type="submit" onClick={sendMessage}>
                        <Send />
                    </IconButton>
                </form>
                <IconButton>
                    <Mic />
                </IconButton>
            </div>
        </div>
    )
}

export default Chat
