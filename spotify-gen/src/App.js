import React, { Component } from 'react';
import TrackGraph from './graph/TrackGraph'
import './App.css';

import {spotifyApi} from './index';

class App extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);

    }
    this.state = {
      loggedIn: token ? true : false,
      page: 0
    }

  }



  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q);
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }



  render() {
    return (
      <div className="App">
        {!this.state.loggedIn ?
          <a href='http://localhost:8888'> Login to Spotify </a> :
          <TrackGraph/>}
      </div>
    );
  }
}

export default App;
