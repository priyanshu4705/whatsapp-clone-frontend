import { Avatar, IconButton, Tooltip } from '@material-ui/core'
import { AttachFile, InsertEmoticonOutlined, Mic, MoreVert, SearchOutlined, Send } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import db from '../firebase'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import firebase from 'firebase'
import '../assets/chat.css'

function Chat(props) {

    const [input, setInput] = useState('');
    const [roomName, setRoomName] = useState('');
    const [messages, setMessages] = useState([]);
    const [seed, setSeed] = useState('');
    const { roomId } = useParams();
    const { user } = props.user;

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
        if (roomId) {
            const unsub1 = db.collection('rooms').doc(roomId)
                .onSnapshot((snap) => setRoomName(snap.data().name));

            const unsub2 = db.collection('rooms').doc(roomId)
                .collection('messages').orderBy('timestamp', 'asc')
                .onSnapshot((snap) => (setMessages(snap.docs.map(doc => doc.data()))));
            
            return () => {
                unsub1();
                unsub2();
            }
        }
    }, [roomId]);

    const sendMessage = (e) => {
        e.preventDefault();
        db.collection('rooms').doc(roomId)
            .collection('messages').add({
                message: input,
                recieved: false,
                name: user.displayName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
        setInput('');
    }

    return (
        <div className="chat">
            <div className="chat_header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="chat_headerInfo">
                    <h3>{roomName}</h3>
                    <p>{new Date(messages[messages.length - 1]?.timestamp?.toDate()).toString().substring(16, 24)}</p>
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
                {messages.map(message => (
                    <div key={new Date(message.timestamp?.toDate()).toString().substring(16, 24)} className={`chat_message ${message.name === user.displayName && "chat_reciever"}`}>
                        <p className="chat_name">{message.name}</p>
                        <p>
                            {message.message}
                            <span className="chat_time">
                                {new Date(message.timestamp?.toDate()).toString().substring(16, 24)}
                            </span>
                        </p>
                    </div>
                ))}
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
                    <Tooltip title="Send Message">
                    <IconButton type="submit" onClick={sendMessage}>
                        <Send />
                        </IconButton>
                    </Tooltip>
                </form>
                <IconButton>
                    <Mic />
                </IconButton>
            </div>
        </div>
    )
}

Chat.propTypes = {
    user: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user
});


export default connect(mapStateToProps, null)(Chat);
