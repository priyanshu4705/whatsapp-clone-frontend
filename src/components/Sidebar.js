import React, { useEffect, useState } from 'react'
import '../assets/sidebar.css';
import ChatIcon from '@material-ui/icons/Chat';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import MeetingRoomRoundedIcon from '@material-ui/icons/MeetingRoomRounded';
import { Avatar, IconButton, Tooltip } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { SearchOutlined } from '@material-ui/icons';
import SidebarChat from './SidebarChat';
import db from '../firebase'
import { connect } from 'react-redux';
import { logOut } from '../actions/userActions'
import PropTypes from 'prop-types'

function Sidebar(props) {

    const [rooms, setRooms] = useState([]);
    const { user } = props.user;

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
                <Avatar src={user?.photoURL} />
                <div className="sidebar_headerRight">
                    <Tooltip title="Add a new Room to Chat">
                        <IconButton onClick={addNewRoom}>
                            <AddIcon />
                        </IconButton>
                    </Tooltip>
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <Tooltip title="Logout">
                        <IconButton onClick={props.logOut}>
                            <   MeetingRoomRoundedIcon />
                        </IconButton>
                    </Tooltip>
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

Sidebar.propTypes = {
    user: PropTypes.object.isRequired,
    logOut: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user
});


export default connect(mapStateToProps, {logOut})(Sidebar)
