import React from 'react';
import ReactDOM from 'react-dom';
// Hash routing due to GHPages requiring multiple repos to do page by page navigation and right now I want a consolidated project
import {
  HashRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import 'semantic-ui-css/semantic.min.css';

// 'Webpage' Components
import Home from './Homepage/home';
import ArmourApp from './Projects/ArmourApp/ArmourCore';
import SocialApp from './Projects/SocialApp/SocialCore';
import NepetaPage from './Projects/NepetaDisplay/nepetaCore';

import NavBar from './NavBar';
import Background from './background';



// import reportWebVitals from './reportWebVitals';

let projects = [
  { key: 'armour-app', name: 'Armour App', preview: ArmourApp.preview },
  { key: 'socials', name: 'Social App', preview: SocialApp.preview }
]

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <NavBar page='/' />
      <Switch>

        {/* Home page */}
        <Route exact path="/">
          <Background height={8} />
          {/* Simple padding method due to NavBar being sticky */}
          <br /> <br /> <br />
          <Home projects={projects} />
        </Route>

        {/* Armour chart app page */}
        <Route path="/armour-app">
          <Background />
          {/* Simple padding method due to NavBar being sticky */}
          <br /> <br /> <br />
          <ArmourApp />
        </Route>

        {/* Social aggregator page */}
        <Route exact path="/socials">
          <Background height={8} />
          {/* Simple padding method due to NavBar being sticky */}
          <br /> <br /> <br />
          <SocialApp />
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
