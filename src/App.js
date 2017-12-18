import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';

import Navbar from './Components/Navbar/Navbar.js';
import Landing from './Components/Landing/Landing.js';
import LoginSignup from './Components/LoginSignup/LoginSignup.js';
import VideoPage from './Components/VideoPage/VideoPage.js';
import PricingPage from './Components/PricingPage/PricingPage.js';
import ExplorePage from './Components/ExplorePage/ExplorePage.js';
import UploadPage from './Components/UploadPage/UploadPage.js';
import VideoUpload from './Components/UploadPage/VideoUpload.js';
import CategoryPage from './Components/CategoryPage/CategoryPage.js';

import {firebaseAuth} from './fire.js';

var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;

class App extends Component {
  // Set Context UID for child components THIS IS EXPERIMENTAL 
  static childContextTypes = {
    currentUID: PropTypes.string
  };
  getChildContext() {
    return {currentUID: this.state.uid};
  }

  state = {
    authed: false,
    loading: true,
    uid: '',
  }

  componentDidMount () {
    this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
          loading: false,
          uid: user.uid
        })
      } else {
        this.setState({
          authed: false,
          loading: false,
          uid: '',
        })
      }
    })
  }
  componentWillUnmount () {
    this.removeListener()
  }
  render() {
    return (
      <div className="App">
        <Router>
          <div className='container'>
            <Navbar 
            authed={this.state.authed}
            uid={this.state.uid}/>
            <Switch>
              <Route path='/category/:type' component={CategoryPage}/>
              <Route path='/video/:id' component={VideoPage}/>
              <Route path='/explore' component={ExplorePage}/>
              <Route exact path='/upload' component={UploadPage}/>
              <Route exact path='/upload/video' component={VideoUpload}/>
              <Route path='/pricing' render={() => (<PricingPage uid={this.state.uid}/>)}/>
              <Route path='/login' component={LoginSignup}/>
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
