import React from 'react';
import { VictoryTooltip } from 'victory';
import './graph.css';
import { Row, Col } from 'reactstrap';

class TrackHoverDetails extends React.Component {
  render() {
    const { x, y, datum } = this.props;
    const imageLink = datum.album.images[0].url

    return (

      <foreignObject x={x} y={y} width="400" height="400">
        <div className="TrackHoverDetail">
          <Row>
            <Col xs="2"><img src={imageLink} style={{ height: 70 }} alt="album art" /></Col>
            <Col>
              <h1>{datum.name}</h1>
              <h2>{datum.artists[0].name}</h2>
            </Col>
          </Row>

        </div>

      </foreignObject>
    );
  }
}

export default TrackHoverDetails;