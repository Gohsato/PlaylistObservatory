import React, { Component } from 'react';
import { Button, Card, Col,CardColumns, CardTitle, Container } from 'reactstrap';
import { Axis, AXIS_UNITS } from './graph/graphParams';

function _RadioRow(fieldName, current, onBtnClick, options) {
    return (
        <Card>
            <CardTitle>{fieldName}</CardTitle>
            {options.map((option) =>
                <Button key={option} onClick={() => { onBtnClick(option) }} active={current === option}>
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
    onRadioBtnClick(selection,field) {
        this.setState({ [field]: new Axis(selection) },()=>this.props.onChange(this.state));
    }


    render() {
        return (
            <Container fluid>
                <Col>
                    {new _RadioRow("X",this.state.xAxis.name, (btn)=>this.onRadioBtnClick(btn,"xAxis"), 
                        [AXIS_UNITS.energy, AXIS_UNITS.danceability, AXIS_UNITS.valence])}

                    {new _RadioRow("Y",this.state.yAxis.name, (btn)=>this.onRadioBtnClick(btn,"yAxis"), 
                        [AXIS_UNITS.energy, AXIS_UNITS.danceability, AXIS_UNITS.valence])}
                </Col>
            </Container>
        )
    }
}

export default ControlPanel;