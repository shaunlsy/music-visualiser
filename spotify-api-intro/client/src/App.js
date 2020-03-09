import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Spotify from 'spotify-web-api-js'

const spotifyWebApi = new Spotify()
console.log("spotify", spotifyWebApi)

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
    if (params.access_token){
      spotifyWebApi.setAccessToken(params.access_token)
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

  getNowPlaying(){
    console.log("this",this)
    console.log("spot", spotifyWebApi.getMyCurrentPlaybackState())
    spotifyWebApi.getMyCurrentPlaybackState()
    .then((response) => {
      console.log("response",response.item)
      this.setState({
        nowPlaying: {
          name: response.item,
          image: response.item
        }
      });
    });
  }

  render() {
    return (
    <div className="App">
      <a href="http://localhost:8888">
        <button>Login with Spotify</button>
      </a>
      <div> Now Playing: {this.state.nowPlaying.name}  </div>
      <div>
        <img  src={this.state.nowPlaying.image} style={{width: 100}}/>
      </div>
      <button onClick={() => this.getNowPlaying()}>
      Check now Playing
      </button>
    </div>
    );
  }
};

export default App;
