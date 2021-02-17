import { Avatar } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import '../assets/sidebarchat.css'
import db from '../firebase'

function SidebarChat({ id, name }) {

    const [seed, setSeed] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
        if (id)
            db.collection('rooms')
                .doc(id).collection('messages')
                .orderBy('timestamp', 'desc').onSnapshot((snap) => (
                    setMessages(snap.docs.map((doc) => doc.data()))));
    }, [id]);

    return (
        <Link to={`/rooms/${id}`}>
            <div className="sidebarchat">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="sidebarchat_info">
                    <h2>{name}</h2>
                    <p>{messages[0]?.message}</p>
                </div>
            </div>
        </Link>
    )
}

export default SidebarChat
