import React from "react";

const changeArtist = (artist) => this.a


const AlbumList = props => {
  return(
      <div className="App">
        <div className="main-wrapper">

          <h1>Artist: {props.albums[0].artists[0].name}</h1>
          <table className="table">
            <tbody>
            {/*{*/}
            {/*  props.songs.map((artist) =>*/}
            {/*      <tr key={artist.name}>*/}
            {/*        <td>{artist.name}</td>*/}
            {/*        <td>{artist.id}</td>*/}
            {/*        /!*<button onClick={() => this.newArtist(artist.id)}>*!/*/}
            {/*        /!*  {artist.name}*!/*/}
            {/*        /!*</button>*!/*/}
            {/*      </tr>*/}
            {/*  )*/}
            {/*}*/}

            {
              props.artists.map((artist) =>
                  <tr key={artist.name}>
                    {/*<a href={this.newArtist(artist.id)|> </a>*/}
                    {/*<td>{artist.name}</td>*/}

                    <a className="btn btn-primary float-right"
                       href={`/?aId=${artist.id}`}>
                      {artist.name}
                    </a>

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