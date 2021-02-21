import React from "react";
import "../css/AlbumList.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import CardGroup from 'react-bootstrap/CardGroup';
import Card from 'react-bootstrap/Card';
import logo from '../logo.svg';

const changeArtist = (artist) => this.a


const AlbumList = props => {
    return(
        <div className="App">
            <div className="main-wrapper">

                <h1>Artist: {props.albums[0].artists[0].name}</h1>
                {/*<table className="table">*/}
                {/*  <tbody>*/}
                {

                    props.artists.map((artist) =>
                            // <tr key={artist.name}>
                            //   <td>{artist.name}</td>
                            // </tr>
                            <Card>
                                <Card.Img variant="top" src={logo} />
                                <Card.Title>{artist.name}</Card.Title>
                            </Card>



                        // <Container fluid>
                        //     <Row>
                        //         <Col>{artist.name}</Col>
                        //         <Col>{artist.name}</Col>
                        //     </Row>
                        // </Container>
                    )
                }
                {/*  </tbody>*/}
                {/*</table>*/}

            </div>
        </div>
    );
}

export default AlbumList