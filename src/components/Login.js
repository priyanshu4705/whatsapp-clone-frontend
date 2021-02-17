import { Button } from '@material-ui/core';
import React from 'react';
import {auth, provider} from '../firebase'
import '../assets/login.css';

function Login() {

    const SignIn = () => {
        auth.signInWithPopup(provider)
            .then((result) => { console.log(result.user)})
            .catch((error) => alert(error.message));
    }

    return (
        <div className="login">
            <div className="login_container">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/150px-WhatsApp.svg.png" alt="" />
                <div className="login_text">
                    <h1>Sign In to WhatsApp</h1>
                </div>
                <Button onClick={SignIn}>Sign In with google</Button>
            </div>
        </div>
    )
}

export default Login
