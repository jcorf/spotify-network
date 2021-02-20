import React from "react";

const SongList = props => {
  return(
      <div className="App">
        <div className="main-wrapper">

          {<h1>Artist: {props.albums[0].artists[0].name}</h1>}

          <table className="table">
            <tbody>
            {
              props.albums.map((item) =>
                  <tr key={item.name}>
                    <td>{item.name}</td>
                    <td>{item.id}</td>
                  </tr>
              )
            }
            </tbody>
          </table>

        </div>
      </div>
  );
}

export default SongList