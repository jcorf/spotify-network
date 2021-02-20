import React, { Component } from "react";
import * as $ from "jquery";
import { authEndpoint, clientId, redirectUri, scopes } from "../config";
import hash from "../hash";
import Player from "./Player";
import logo from "../logo.svg";
import "../css/App.css";
import Artist from "./Artist";



class App extends Component {
  constructor() {
    super();

    this.state = {
      token: null,
      item: {
        album: {
          images: [{ url: "" }]
        },
        name: "",
        artists: [{ name: "" }, {popularity: 0}, {id: 0}],
        duration_ms: 0
      },
      no_data: false,

    };

   //  this.getCurrentlyPlaying = this.getCurrentlyPlaying.bind(this);
    this.getArtists = this.getArtists.bind(this);
    this.tick = this.tick.bind(this);
  }



  componentDidMount() {
    // Set token
    let _token = hash.access_token;

    if (_token) {
      // Set token
      this.setState({
        token: _token
      });
      this.getArtists(_token);
    }

    // set interval for polling every 5 seconds
    this.interval = setInterval(() => this.tick(), 5000);
  }

  componentWillUnmount() {
    // clear the interval to save resources
    clearInterval(this.interval);
  }

  tick() {
    if(this.state.token) {
      this.getArtists(this.state.token)
    }
  }

  // getPlaylists(token) {
  //   $.ajax({
  //     url: "https://api.spotify.com/v1/me/playlists",
  //     type: "GET",
  //     beforeSend: xhr => {
  //       xhr.setRequestHeader("Authorization", "Bearer " + token);
  //     },
  //
  //     success: data => {
  //
  //     }
  //
  //
  //   })
  // }

  getArtists(token) {
    // Make a call using the token
    $.ajax({
      url: "https://api.spotify.com/v1/me/player",
      type: "GET",
      beforeSend: xhr => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: data => {
        // Checks if the data is not empty
        if(!data) {
          this.setState({
            no_data: true,
          });
          return;
        }

        this.setState({
          item: data.item,
          no_data: false /* We need to "reset" the boolean, in case the
                            user does not give F5 and has opened his Spotify. */
        });
      }
    });
  }



  render() {
    return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            {!this.state.token && (
                <a
                    className="btn btn--loginApp-link"
                    href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                        "%20"
                    )}&response_type=token&show_dialog=true`}
                >
                  Login to Spotify
                </a>
            )}

            {this.state.token && !this.state.no_data && (
                <Artist
                    item={this.state.item}
                  />

            )}


          </header>
        </div>
    );
  }
}

export default App;