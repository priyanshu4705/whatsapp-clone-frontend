import React, { useEffect, useState } from 'react'
import '../assets/sidebar.css';
import ChatIcon from '@material-ui/icons/Chat';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Avatar, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { SearchOutlined } from '@material-ui/icons';
import SidebarChat from './SidebarChat';
import db from '../firebase'

function Sidebar() {

    const [rooms, setRooms] = useState([]);

    useEffect(() => {

        const unsubscribe = db.collection('rooms')
            .onSnapshot((snap) => setRooms(snap.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
            }))
            ));
        return () => unsubscribe();
    }, []);

    const addNewRoom = () => {
        const newRoom = prompt('Enter a new room to start a chat');

        if (newRoom) {
            db.collection('rooms').add({
                name: newRoom,
            });
        }
    }

    return (
        <div className="sidebar">
            <div className="sidebar_header">
                <Avatar src="https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png" />
                <div className="sidebar_headerRight">
                    <IconButton onClick={addNewRoom}>
                        <AddIcon />
                    </IconButton>
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            <div className="sidebar_search">
                <div className="sidebar_searchContainer">
                    <SearchOutlined />
                    <input type="text" placeholder="Search or start new chat" />
                </div>
            </div>
            <div className="sidebar_chats">
                {rooms.map(room => (
                    <SidebarChat key={room.id} id={room.id} name={room.data.name} />
                ))}
            </div>
        </div>
    )
}

export default Sidebar
