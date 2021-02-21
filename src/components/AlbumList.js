import React from "react";
import "../css/AlbumList.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import logo from '../logo.svg';



const AlbumList = props => {
  return(
      <div>

        {/*DELETING THIS FILE RUINS THE WRAPPING WIHTOUT BE CALLED CODE IS WEIRD ?!!!*/}
        {/*<div>*/}
        {/*  <h1 className={"heading"}>Artist: {props.albums[0].artists[0].name}</h1>*/}
        {/*</div>*/}
        {/*<Container fluid true>*/}
        {/*  <Row className={"row"}>*/}
        {/*    {props.artists.map((artist) => (*/}
        {/*        <Col xs="3">*/}
        {/*          <div>*/}
        {/*            <img variant="top" className={"circle"} src={logo} />*/}
        {/*            <h3 className={"text"}>{artist.name}</h3>*/}
        {/*          </div>*/}
        {/*        </Col>*/}
        {/*    ))}*/}
        {/*  </Row>*/}
        {/*</Container>*/}
      </div>

  );
}

export default AlbumList