import React from "react";
import { Axis, AXIS_UNITS } from '../apis/graphParams';
import CornerButtons from './CornerButtons';
import TrackGraph from './TrackGraph';
// import HelpAlert from "./HelpAlert";


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
            <div className="fillheight" id="Graph">
                <CornerButtons dataFields={this.state.dataFields} setDataFields={this.setDataFields}
                    updateRecommendations={this.props.updateRecommendations} forwardedRef={this.props.forwardedRef}
                />
                <TrackGraph dataFields={this.state.dataFields}
                    ref={this.props.forwardedRef}
                    graphData={this.props.graphData}
                    onPointClick={this.props.pointClick}
                    startDomain={{ x: [0, 100], y: [0, 100] }} />
                {/* <div className="alert"><HelpAlert/></div> */}
            </div>
        )
    }
}


export default Graph;