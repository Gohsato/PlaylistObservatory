import React from "react";
import { FaHome, FaSyncAlt, FaWrench } from 'react-icons/fa';
import { Button } from 'reactstrap';
import ControlPanel from '../ControlPanel/ControlPanel';
import ControlPanelPopover from '../ControlPanel/ControlPanelPopover';
import { Axis, AXIS_UNITS } from '../apis/graphParams';
import TrackGraph from './TrackGraph';


class Graph extends React.Component {
    constructor() {
        super();
        this.state = {
            dataFields: {
                xAxis: new Axis(AXIS_UNITS.danceability),
                yAxis: new Axis(AXIS_UNITS.energy)
            }
        }
        this.setDataFields = this.setDataFields.bind(this);
    }

    setDataFields(newFields) {
        this.setState({
            dataFields: newFields
        });
    }

    render() {
        return (
            <div className="fillheight">
                <div id="CornerButtons">
                    <ControlPanelPopover title={<FaWrench/>}>
                        <ControlPanel dataFields={this.state.dataFields} onChange={this.setDataFields}
                            updateRecommendations={this.props.updateRecommendations} graphRef={this.props.forwardedRef} />
                    </ControlPanelPopover>
                    <div><Button onClick={this.props.updateRecommendations}><FaSyncAlt/></Button></div>
                    {this.props.forwardedRef.current?
                        <div><Button onClick={this.props.forwardedRef.current.setSelected}><FaHome/></Button></div>:
                        null}
                </div>
                <TrackGraph dataFields={this.state.dataFields}
                    ref={this.props.forwardedRef}
                    graphData={this.props.graphData}
                    onPointClick={this.props.pointClick} 
                    startDomain={{ x: [0, 100], y: [0, 100]}}/>
            </div>
        )
    }
}


export default Graph;