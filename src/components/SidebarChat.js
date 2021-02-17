import { Avatar } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import '../assets/sidebarchat.css'

function SidebarChat({ id, name }) {

    const [seed, setSeed] = useState('');

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, []);

    return (
        <Link to={`/rooms/${id}`}>
            <div className="sidebarchat">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="sidebarchat_info">
                    <h2>{name}</h2>
                    <p>this is last text</p>
                </div>
            </div>
        </Link>
    )
}

export default SidebarChat
