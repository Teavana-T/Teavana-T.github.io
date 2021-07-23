import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import 'semantic-ui-css/semantic.min.css';
import ArmourApp from './ArmourChart/ArmourApp';
import Background from './background';
import Home from './Homepage/home';
import NavBar from './NavBar';
// import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Router>
        <Switch>
          <Route path="/minecraft-damage/">
            <NavBar page='aApp' />
            <Background />
            <ArmourApp />
          </Route>
          <Route path="/topics">
            <div>goodbye</div>
          </Route>
          <Route path="/">
            <NavBar page='home' />
            <Background height={8} />
            <Home />
          </Route>
        </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(); 
