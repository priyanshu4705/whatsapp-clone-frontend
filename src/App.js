import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Chat from './components/Chat';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import PropTypes from 'prop-types';
import { GitHub } from '@material-ui/icons';

function App(props) {

  const { user } = props.user;

  return (
    <div className="app">
      {(!user) ?
        (<Login />) :
        <div>
          <div className="app_body">
            <Router>
              <Sidebar />
              <Switch>
                <Route path="/rooms/:roomId">
                  <Chat />
                </Route>
                <Route path="/">
                  <Chat />
                </Route>
              </Switch>
            </Router>
          </div>
          <p>Developed with 💜 by Priyanshu Srivastava. <a href="https://github.com/priyanshu4705" target="_blank" rel="noreferrer">
            <GitHub />
              github
            </a>
          </p>
        </div>}
    </div>
  );
}


App.propTypes = {
  user: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps, null)(App);