import React, { Component } from 'react';
import { VictoryAxis, VictoryChart, VictoryLabel, VictoryScatter, VictoryTheme, VictoryTooltip, VictoryZoomContainer } from 'victory';
import "../../App.css";
import TrackHoverDetails from './TrackHoverDetails';


class TrackGraph extends Component {
    constructor() {
        super();
        this.state = {
            externalMutations: undefined
        };
        this.setSelected = this.setSelected.bind(this);
    }

    createEventHandler(clicked,callback){
        return(
            {
                childName: ["playlist", "recommended"],
                target: ["data"],
                eventKey: "all",
                mutation: (point) => {
                    return (clicked && point.datum.id === clicked.datum.id) ?
                        ({ style: Object.assign({}, point.style, { fill: "gold" }) }) :
                        ({ style: undefined });
                },
                callback: callback,
            }
        )
    }


    removeMutation() {
        this.setState({
          externalMutations: undefined
        });
      }

    setSelected(clicked) {
        this.setState({
            externalMutations:[
                this.createEventHandler(clicked,this.removeMutation.bind(this))
            ]
        })
    }

    renderGraph() {

        return (
            <VictoryChart
                externalEventMutations={this.state.externalMutations}
                theme={VictoryTheme.material}
                domain={{ x: [0, 100], y: [0, 100] }}
                containerComponent={<VictoryZoomContainer zoomDomain={{ x: [0, 100], y: [0, 100] }} />}
                // animate={{ duration: 5000, easing: "bounce" }}
                style={{ parent: { maxWidth: window.innerHeight, border: "1px solid #ccc" } }}
                width={500}
                height={500}
                events={[
                    {
                        childName: ["playlist", "recommended"],
                        target: "data",
                        eventHandlers: {
                            onClick: (_, clicked) => {
                                
                                return [
                                    this.createEventHandler(clicked,this.props.onPointClick(clicked))

                                ]
                            }
                        }
                    }
                ]}
            >

                <VictoryAxis label={this.props.dataFields.xAxis.name} axisLabelComponent={<VictoryLabel dy={20} />} />
                <VictoryAxis label={this.props.dataFields.yAxis.name} axisLabelComponent={<VictoryLabel dy={-20} />} dependentAxis />

                <VictoryScatter
                    name="playlist"
                    size={10}
                    data={this.props.graphData.playlistTracks}
                    x={this.props.dataFields.xAxis.dataFunction}
                    y={this.props.dataFields.yAxis.dataFunction}
                    labels={(d) => ""}
                    labelComponent={<VictoryTooltip flyoutComponent={<TrackHoverDetails />} />}
                />

                <VictoryScatter
                    name="recommended"
                    size={7}
                    data={this.props.graphData.recommendTracks}
                    x={this.props.dataFields.xAxis.dataFunction}
                    y={this.props.dataFields.yAxis.dataFunction}
                    labels={(d) => ""}
                    labelComponent={<VictoryTooltip flyoutComponent={<TrackHoverDetails />} />}
                    style={{
                        data: {
                            fill: "tomato"
                        }
                    }}
                />
            </VictoryChart>);
    }

    render() {
        return (
            <div>
                {this.props.graphData ?
                    this.renderGraph() :
                    <p>no playlist</p>}

            </div>
        );
    }

}

export default TrackGraph;