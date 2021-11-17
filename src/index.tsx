import React from 'react';
import ReactDOM from 'react-dom';
// Hash routing due to GHPages requiring multiple repos to do page by page navigation and right now I want a consolidated project
import {
  HashRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import 'semantic-ui-less/semantic.less';

// 'Webpage' Components
import Home from './Homepage/home';
import CV from './CurriculumVitae/cv';
import ArmourApp from './Projects/ArmourApp/ArmourCore';
import SocialApp from './Projects/SocialApp/SocialCore';
import GameOfLife from './Projects/GameOfLife/GameOfLifeCore';

// 'Staple' Components
import NavBar from './NavBar';
import Background from './Background';
import FakeReviewCore from './Projects/FakeReviews/FakeReviewCore';

import { Container, Header, Segment } from 'semantic-ui-react';



// import reportWebVitals from './reportWebVitals';

let projects = [
  { key: 'armour-app', name: 'Armour App', preview: ArmourApp.preview },
  { key: 'socials', name: 'Social App', preview: SocialApp.preview }
]

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        {/* Home page */}
        <Route exact path="/">
          <NavBar page='home' />
          <Background />
          <Home projects={projects} />
        </Route>

        {/* CV */}
        <Route exact path="/cv">
          <NavBar page='cv' />
          <Background />
          <CV />
        </Route>

        {/* Armour chart app page */}
        <Route path="/armour-app">
          <NavBar page='aApp' />
          <Background />
          <ArmourApp />
        </Route>

        {/* Social aggregator page */}
        <Route exact path="/socials">
          <NavBar page='sApp' />
          <Background />
          <SocialApp />
        </Route>

        <Route exact path="/fake-review">
          <NavBar page='fReview' />
          <Background />
          <FakeReviewCore />
        </Route>

        <Route exact path="/game-of-life">
          <NavBar page='GoL' />
          <Background />
          <GameOfLife />
        </Route>

        <Route>
          <NavBar page='404' />
          <Background />
          <Container>
            <Segment>
              <Header content='404 - Page not found' dividing />
              We couldn't find the page you asked for! If you believe this is an error please contact me through me email (found in social page)
            </Segment>
          </Container>
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
