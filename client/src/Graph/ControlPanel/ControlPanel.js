import React, { Component } from 'react';
import { Button, Card, CardTitle, Col, Row, Container, CardBody } from 'reactstrap';
import './ControlPanel.css';
import { Axis, AXIS_UNITS } from '../../apis/graphParams';

function ButtonSet(props) {
    return (
        <Card className="graph-settings-card">
            <CardBody>
                <CardTitle>{props.fieldName}</CardTitle>
                <Container>
                    <Row>
                        {props.options.map((option) =>
                            <Button key={option} onClick={() => { props.onBtnClick(option) }} active={props.current === option}>
                                {option}
                            </Button>
                        )}
                    </Row>
                </Container>
            </CardBody>
        </Card>
    )
}

function CircleIcon(props) {
    return (
        <div className="icon">
            <p>{props.title}:</p>
            <div className="dot">
                <svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50%" cy="50%" r="2" fill={props.color} />
                </svg>
            </div>
        </div>
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


    render() {
        return (
            <div id="ControlPanel">
                <Col>
                    <CircleIcon title="Recommended Track" color="tomato" />
                    <CircleIcon title="Playlist Track" color="#455A64" />
                    < ButtonSet fieldName="X Axis" current={this.state.xAxis.name} onBtnClick={(btn) => this.onRadioBtnClick(btn, "xAxis")}
                        options={[AXIS_UNITS.energy, AXIS_UNITS.danceability, AXIS_UNITS.valence]} />
                    < ButtonSet fieldName="Y Axis" current={this.state.yAxis.name} onBtnClick={(btn) => this.onRadioBtnClick(btn, "yAxis")}
                        options={[AXIS_UNITS.energy, AXIS_UNITS.danceability, AXIS_UNITS.valence]} />
                </Col>
            </div>
        )
    }
}

export default ControlPanel;