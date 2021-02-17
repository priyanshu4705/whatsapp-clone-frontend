import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Chat from './components/Chat';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div className="app">
      <div className="app_body">
        <Router>
          <Sidebar />
          <Switch>
            <Route path="/rooms/:roomId">
              <Chat />
            </Route>
            <Route path="/">
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
