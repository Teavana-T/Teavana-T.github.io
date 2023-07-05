import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Home from './Homepage/home';
import SocialApp from './Projects/SocialApp/SocialCore';
import NavBar from './NavBar';
import Background from './Background';
import 'semantic-ui-css/semantic.min.css';
import SDewBundles from './Projects/StardewDump/Bundles/Bundles';
import FForIdiots from './Projects/FForIdiots/FForIdiots';

import { DeviceList } from './Projects/FForIdiots/FForIdiots';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>

    <HashRouter>
      
      <Routes>
        <Route path='/app'
          element={
            <React.Fragment>
            <Background />
            <NavBar page={''} />
          <App />
          </React.Fragment>
        }
        >
        </Route>

        <Route path='/'
          element={
            <React.Fragment>
              <Background />
            <NavBar page={''} />
              <Home projects={[{ key: 1, name: 'Social app', preview: SocialApp.preview }]} />
            </React.Fragment>
          }
        />
        <Route path='/bundles'
          element={
            <React.Fragment>
              <Background />
            <NavBar page={''} />
              <SDewBundles />
            </React.Fragment>
          }
        />

        <Route path='/socials' element={<SocialApp />} />
        <Route
          path='*'
          element={<h1>404 not found</h1>}>

        </Route>

        <Route path='/ffi'
          element={
            <React.Fragment>
              <DeviceList />
            </React.Fragment>
          }
        />

        <Route path='/ffi/:device'
          element={
            <React.Fragment>
              <FForIdiots />
            </React.Fragment>
          }
        />
      </Routes>
    </HashRouter>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
