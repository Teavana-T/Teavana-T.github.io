import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import 'semantic-ui-css/semantic.min.css';
import ArmourApp from './ArmourChart/ArmourApp';
import Background from './background';
import Home from './Homepage/home';
import NavBar from './NavBar';
import NepetaPage from './NepetaDisplay/nepetaCore';
// import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Router>
        <NavBar page='/' />
        <Switch>
          <Route path="/minecraft-armour">
            <Background />
            <br />
            <ArmourApp />
          </Route>
          <Route exact path="/">
            <Background height={8} />
            <br />
            <Home />
          </Route>
          <Route exact path="/nepeta/">
            <Background height={8} />
            <br />
            <NepetaPage />
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
