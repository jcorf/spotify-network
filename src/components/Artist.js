import React from "react";

const Artist = props => {

  return(
  <div className="App">
    <div className="main-wrapper">

      <table className="table">
        <tbody>
        {
          props.item.artists.map((artist) =>
              <tr key={artist.name}>
                <td>{artist.name}</td>
                <td>{artist.popularity}</td>
                <td>{artist.id}</td>
              </tr>
          )
        }
        </tbody>
      </table>

    </div>
  </div>
  );
}

export default Artist;