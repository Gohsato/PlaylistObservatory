import React, { Component } from 'react';
import LoginPage from './Login/LoginPage'
import './App.css';
import PlaylistSelector from './PlaylistSelect/PlaylistSelector';
import { sessionStart } from './apis/login';

class App extends Component { 
  constructor(){
    super();
    const refreshId = sessionStart();
    this.state = {
      refreshId: refreshId,
      loggedIn: refreshId?true:false,
    }
    this.login = this.login.bind(this);
  }

  componentWillUnmount(){
    if(this.state.refreshId){
      clearInterval(this.state.refreshId);
    }
  }

  login(){
    if(process.env.NODE_ENV==='development'){
      window.location.href = 'http://localhost:8888/login';
    }else{
      window.location.href = '/login';
    }
  }

  render() {
    return (
      <div className="App">
        {!this.state.loggedIn ?
          <LoginPage login={this.login}/>:
          <PlaylistSelector/>}
      </div>
    );
  }
}

export default App;
