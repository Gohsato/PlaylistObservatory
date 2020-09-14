import React, { Component } from 'react';
import LoginPage from './LoginPage/LoginPage'
import './App.css';
import PlaylistSelector from './PlaylistSelect/PlaylistSelector';
import { sessionStart, login as spotifyLogin } from './apis/login';

class App extends Component { 
  constructor(){
    super();
    this.state = {
      loggedIn: false,
    }
    sessionStart().then((login)=>{
      if(login){
        this.setState({loggedIn:true});
      }
    })
  }

  render() {
    return (
      <div className="App">
        {!this.state.loggedIn ?
          <LoginPage login={spotifyLogin}/>:
          <PlaylistSelector/>}
      </div>
    );
  }
}

export default App;
