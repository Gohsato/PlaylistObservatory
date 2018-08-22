import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';
import ControlPanel from './ControlPanel';
import { Axis, AXIS_UNITS } from './graph/graphParams';
import TrackGraph from './graph/TrackGraph';



class SongVisualizer extends Component {
    constructor() {
        super();
        this.state = {
            dataFields:{
                xAxis: new Axis(AXIS_UNITS.danceability),
                yAxis: new Axis(AXIS_UNITS.energy)
            }
        }
    }

    render() {
        return (
            <div className="Visualizer">
                <Row className="align-items-center Visualizer" noGutters>
                    <Col xs="2">
                        <h1>h1</h1>
                    </Col>
                    <Col xs="8">
                        <TrackGraph dataFields={this.state.dataFields} />
                    </Col>
                    <Col xs="2" >
                        <ControlPanel dataFields={this.state.dataFields} 
                            onChange={(newFields)=>this.setState({dataFields:newFields})}/>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default SongVisualizer;