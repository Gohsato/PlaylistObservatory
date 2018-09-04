import React, { Component } from 'react';
import { Button, Card, CardTitle, Col, Row } from 'reactstrap';
import './Graph.css';
import { Axis, AXIS_UNITS } from './graphParams';

function ButtonSet(props) {
    return (
        <Card>
            <CardTitle>{props.fieldName}</CardTitle>
            {props.options.map((option) =>
                <Button key={option} onClick={() => { props.onBtnClick(option) }} active={props.current === option}>
                    {option}
                </Button>
            )}
        </Card>
    )
}

class ControlPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            xAxis: this.props.dataFields.xAxis,
            yAxis: this.props.dataFields.yAxis,
        }
        this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
    }
    onRadioBtnClick(selection, field) {
        this.setState({ [field]: new Axis(selection) }, () => this.props.onChange(this.state));
    }

    circleIcon(title, color) {
        return (
            <div className="icon">
                <p>{title}:</p>
                <div className="dot">
                    <svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="50%" cy="50%" r="2" fill={color} />
                    </svg>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div id="ControlPanel">
                <Col>
                    <Row>
                        {this.circleIcon("Recommended Track", "tomato")}
                    </Row>
                    <Row>
                        {this.circleIcon("Playlist Track", "#455A64")}
                    </Row>
                    <Row>
                        < ButtonSet fieldName="X" current={this.state.xAxis.name} onBtnClick={(btn) => this.onRadioBtnClick(btn, "xAxis")}
                            options={[AXIS_UNITS.energy, AXIS_UNITS.danceability, AXIS_UNITS.valence]} />
                        < ButtonSet fieldName="Y" current={this.state.yAxis.name} onBtnClick={(btn) => this.onRadioBtnClick(btn, "yAxis")}
                            options={[AXIS_UNITS.energy, AXIS_UNITS.danceability, AXIS_UNITS.valence]} />
                    </Row>
                    <Row>
                        <Button onClick={this.props.updateRecommendations}>Update</Button>
                        <Button onClick={this.props.graphRef.current.setSelected}>Center Graph</Button>
                    </Row>
                </Col>
            </div>
        )
    }
}

export default ControlPanel;