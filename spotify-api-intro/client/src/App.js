import React from 'react';
// import logo from './logo.svg';
import './App.css';


class App extends React.Component{

  constructor(){
    super();
    let params = this.getHashParams()
    this.state = {
      loggedIn: params.access_token ? true : false,
      nowPlaying: {
        name: 'Not Checked',
        image: ''
      }
    }
  }
  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
        hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  render() {
    console.log("hello",this)
    return (
    <div className="App">
      <a href="http://localhost:8888">
        <button>Login with Spotify</button>
      </a>
      <div> Now Playing:  </div>
      <div>
        <img  style={{width: 100}}/>
      </div>
    </div>
    );
  }
};

let app = new App();
export default app.render;
