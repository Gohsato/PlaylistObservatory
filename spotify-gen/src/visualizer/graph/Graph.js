import React from "react";
import ControlPanel from './ControlPanel';
import ControlPanelPopover from './ControlPanelPopover';
import { Axis, AXIS_UNITS } from './graphParams';
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
                <ControlPanelPopover>
                    <ControlPanel dataFields={this.state.dataFields} onChange={this.setDataFields}
                        updateRecommendations={this.props.updateRecommendations} graphRef={this.props.forwardedRef}/>
                </ControlPanelPopover>
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