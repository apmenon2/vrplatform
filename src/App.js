import React, { Component } from 'react';
import './App.css';

import Navbar from './Components/Navbar/Navbar.js';
import Landing from './Components/Landing/Landing.js';
import LoginSignup from './Components/LoginSignup/LoginSignup.js';
import VideoPage from './Components/VideoPage/VideoPage.js';
import PricingPage from './Components/PricingPage/PricingPage.js';
import ExplorePage from './Components/ExplorePage/ExplorePage.js';
import UploadPage from './Components/UploadPage/UploadPage.js';
import VideoUpload from './Components/UploadPage/VideoUpload.js';

var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div className='container'>
            <Navbar />
            <Switch>
              <Route exact path='/video/:id' component={VideoPage}/>
              <Route exact path='/explore' component={ExplorePage}/>
              <Route exact path='/upload' component={UploadPage}/>
              <Route exact path='/upload/video' component={VideoUpload}/>
              <Route exact path='/pricing' component={PricingPage}/>
              <Route exact path='/login' component={LoginSignup}/>
              <Route exact path='/' component={Landing}/>
              <Route render={function() {
                return <p> Not Found </p>
              }} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
