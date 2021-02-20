import React, {Component} from "react";
import * as $ from "jquery";
import {authEndpoint, clientId, redirectUri, scopes} from "../config";
import hash from "../hash";
import "../css/App.css";
import AlbumList from "./AlbumList";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      token: null,
      artist_ID: "",
      albums: [{artists: [{name: ""}]}, {name: ""}, {id: ""}],
      tracks: [{artists: [{name: ""}, {id: ""}]}, {name: ""}],
      all_songs: [],
      all_artists: [],
      all_ids: [],
      no_data: false,
    };

    this.getAlbums = this.getAlbums.bind(this);
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
      this.getAlbums(_token, "3Vl9fyKMIdLMswk8ai3mm9");
      //this.changeArtist();

    }

    // set interval for polling every 5 seconds
    this.interval = setInterval(() => this.tick(), 5000);
  }

  componentWillUnmount() {
    // clear the interval to save resources
    clearInterval(this.interval);
  }

  tick() {
    if (this.state.token) {
      this.changeArtist()
      this.getAlbums(this.state.token);
    }
  }

  changeArtist = () => {
    let artistId = window.location.search.split("=")[1]
    if (artistId !== this.state.artist_ID && artistId !== "") {
      this.setState({artist_Id : artistId})
    }
  }


  getTracksOfAlbum(token, albumId) {
    $.ajax({
      url: "https://api.spotify.com/v1/albums/" + albumId + "/tracks",
      type: "GET",
      beforeSend: xhr => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: data => {

        if (!data) {
          this.setState({
            no_data: true,
          });
          return;
        }
        this.setState({tracks: data.items, no_data: false});
        this.state.tracks.map((track) =>
            this.setState({all_songs: this.state.all_songs.concat(track)})
        )

        this.state.tracks.map((track) => {
              track.artists.map((artist) => {
                    if (!this.state.all_ids.includes(artist.id)) {
                      this.setState(
                          {all_artists: this.state.all_artists.concat(artist)});
                      this.setState({all_ids: this.state.all_ids.concat(artist.id)});
                    }

                  }
              )
            }
        )

      }
    })
  }



  getAlbums(token, artistId) {
    $.ajax({
      url: "https://api.spotify.com/v1/artists/" + artistId + "/albums/?"
          + "offset=0&limit=20&include_groups=album,single,appears_on&market=ES",
      type: "GET",
      beforeSend: xhr => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: data => {
        if (!data) {
          this.setState({
            no_data: true,
          });
          return;
        }

        this.setState({
          albums: data.items,
          artist_Id: artistId,
          all_ids: [artistId],
          no_data: false
        })

        this.state.albums.map((album) =>
            this.getTracksOfAlbum(token, album.id)
        )
      }

    });
  }



  render() {
    return (
        <div className="App">
          <header className="App-header">
            {/*<img src={logo} className="App-logo" alt="logo"/>*/}
            {!this.state.token && (
                <a
                    className="btn btn--loginApp-link"
                    href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                        "%20"
                    )}&response_type=token&show_dialog=true`}>
                  Login to Spotify
                </a>
            )}

            {this.state.token && !this.state.no_data && (
                <AlbumList
                    albums={this.state.albums}
                    songs={this.state.all_songs}
                    artists={this.state.all_artists}
                />
            )}
          </header>
        </div>
    );
  }
}



export default App;