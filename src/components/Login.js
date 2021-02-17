import { Button } from '@material-ui/core';
import React from 'react';
import '../assets/login.css';
import { connect } from 'react-redux';
import { signIn } from '../actions/userActions';
import PropTypes from 'prop-types';

function Login(props) {

    return (
        <div className="login">
            <div className="login_container">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/150px-WhatsApp.svg.png" alt="" />
                <div className="login_text">
                    <h1>Sign In to WhatsApp</h1>
                </div>
                <Button onClick={props.signIn}>Sign In with google</Button>
            </div>
            <p>Developed with 💜 by Priyanshu Srivastava.</p>
        </div>
    )
}

Login.propTypes = {
    signIn: PropTypes.func.isRequired
}

export default connect(null, { signIn })(Login);
