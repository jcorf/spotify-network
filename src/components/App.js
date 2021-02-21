import React, {Component} from "react";
import * as $ from "jquery";
import {authEndpoint, clientId, redirectUri, scopes} from "../config";
import hash from "../hash";
import "../css/App.css";
import logo from '../logo.svg';
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import bkj from "../background.jpg";
import bkp from "../background.png";
import AlbumList from "./AlbumList";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      token: null,
      artist_ID: "",
      artist_Name: "",
      albums: [{artists: [{name: ""}]}, {name: ""}, {id: ""}, {name: ""}],
      tracks: [{artists: [{name: ""},  {id: ""}]}, {name: ""}],
      all_songs: [],
      all_artists: [],
      all_ids: [],
      recent_artist_id: "", 
      temp: "",
      starting_artist: "",
      count: 0,
      no_data: false,
      shared_images : [],
      connections: [],
      mount : 0,
    }


    //this.getAlbums = this.getAlbums.bind(this);
    // this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    // Set token
    let _token = hash.access_token;

    if (_token) {
      // Set token
      this.setState({
        token: _token, mount : 0});
    }
    }
    //this.getAlbums(this.state.token, this.state.recent_artist_id);


    // this.getUserRecentlyPlayed(this.state.token)
    // // // "5Rl15oVamLq7FbSb0NNBNy")

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.mount == 0) {
      this.getUserRecentlyPlayed(this.state.token)
      this.getAlbums(this.state.token, this.state.recent_artist_id)
    }
    //this.getUserRecentlyPlayed(this.state.token)
    //this.getAlbums(this.state.token, this.state.recent_artist_id);
  }

  // componentDidUpdate() {
  //   if (this.state.mount < 1) {
  //     this.getUserRecentlyPlayed(this.state.token)
  //     this.getAlbums(this.state.token, this.state.recent_artist_id);
  //     this.setState(this.setState({mount: 1}));
  //     // }
  //   }
  // }

  // componentWillUnmount() {
  //   // clear the interval to save resources
  //   clearInterval(this.interval);
  // }
  //
  // tick() {
  //   if (this.state.token) {
  //     this.getAlbums(this.state.token);
  //   }
  // }


  //Display the recently played track, get the track's artist and the artist ID, add another variable for artist ID and use that in function call of getAlbums in componentDidMount
  getUserRecentlyPlayed(token) {
    $.ajax({
      url: "https://api.spotify.com/v1/me/player/recently-played" + "?limit=1",
      type: "GET",
      dataType: "json",
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
        this.setState({ recent_artist_id: data.items[0].track.artists[0].id, no_data: false });
      }
    })
  }


  changeArtist(artistId) {
    this.setState({
      albums: [{artists: [{name: ""}, {id: ""}]}, {name: ""}, {id: ""}, {images : [{url : ""}]}],
      tracks: [{artists: [{name: ""}, {id: ""}]},
        {name: ""}],

      all_songs: [],
      all_artists: [],
      all_ids: [],
      count: this.state.count + 1,
      shared_images: [],
    })
    this.getAlbums(this.state.token, artistId)
  }

  getTracksOfAlbum(token, albumId, sharedUrl) {
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
                      const value = [artist.id, sharedUrl, track.name, track.external_urls.spotify]
                      this.setState({shared_images : this.state.shared_images.concat(value)})

                      this.setState(
                          {all_artists: this.state.all_artists.concat(artist)})
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
          + "offset=0&limit=50&include_groups=album,single&market=US",
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

        this.setState({mount : 1})

        this.setState({
          albums: data.items,
          artist_Id: artistId,
          all_ids: [artistId],
          no_data: false
        })

        this.state.albums.map((album) => {
              if (album.images.length ) {
                this.getTracksOfAlbum(token, album.id, album.images[0].url,album.name)
              } else {
                this.getTracksOfAlbum(token, album.id, logo, album.name)
              }
            }
        )

        if (this.state.count == 0) {
          this.setState({starting_artist : this.state.albums[0].artists[0].name})
        } else {
          this.setState({connections : this.state.connections.concat(this.state.albums[0].artists[0].name)})
        }

      }
    });
  }

  render() {
    return (

        <div className="App">
          <header className="App-header">
            {!this.state.token && (
                <div className={"homepage"}>
                  <h1 className={"header"}>Spotify Discovery Network</h1>
                  <a
                      href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                          "%20"
                      )}&response_type=token&show_dialog=true`}
                  ><button className="button">Login to Spotify</button>
                  </a>
                  <h6 className={"made"}> See the network of artists from a recently played Artist by you! <br></br> Look for new music or Challenge yourself to find another artist in minimal connections.</h6>
                  <h6 className={"made"}> Made at HackBeanpot 2021 using Spotify API</h6>





                </div>
            )}

            {this.state.count == 0 && this.state.all_ids.length >= 1 && (
                <h1 className={"heading"}>You recently played: {this.state.albums[0].artists[0].name}</h1>
            )}

            {this.state.token && !this.state.no_data && (

                <div>
                  <div>
                    <div>

                      {this.state.count >= 1 && this.state.albums.length > 0 && (
                          <h1 className={"heading"}>Artist: {this.state.albums[0].artists[0].name}</h1>
                      )}
                      <h3>{this.state.count} connections away from {this.state.starting_artist}</h3>


                      <h4 className={"connection"}>  {
                        this.state.connections.map((name) =>
                            name + " > "
                        )
                      }
                      </h4>
                    </div>
                    <Container fluid true>
                      <Row className={"row"}>
                        {this.state.all_artists.map((artist) => (
                            <Col xs="3">
                              <div>

                            <a target="_blank" href={this.state.shared_images[this.state.shared_images.indexOf(artist.id) + 3]}>
                              <img variant="top" className={"circle"}
                                   src={this.state.shared_images[this.state.shared_images.indexOf(artist.id) + 1]} /></a>
                              <h3 className={"text"}>   <button className={"button"} key={artist.id} onClick={() => this.changeArtist(artist.id)} hover={artist.id}>{artist.name} </button>
                              </h3>

                              <p className={"text"}>
                                  <i> {this.state.shared_images[this.state.shared_images.indexOf(artist.id) + 2]} </i>
                              </p>
                            </div>
                          </Col>
                      ))}
                        </Row>
                      </Container>
                    </div>
                  </div>
                )}
            {this.state.all_ids.length == 1 && this.state.albums.length > 0 && (
                <h3> This artist hasn't collaborated with anyone :( </h3>
            )}

          </header>
        </div>
    );
  }
}



export default App;


