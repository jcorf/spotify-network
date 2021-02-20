import React from "react";

const changeArtist = (artist) => this.a


const AlbumList = props => {
  return(
      <div className="App">
        <div className="main-wrapper">

          <h1>Artist: {props.albums[0].artists[0].name}</h1>
          <table className="table">
            <tbody>
            {
              props.artists.map((artist) =>
                  <tr key={artist.name}>
                    <td>{artist.name}</td>
                  </tr>
              )
            }
            </tbody>
          </table>

        </div>
      </div>
  );
}

export default AlbumList