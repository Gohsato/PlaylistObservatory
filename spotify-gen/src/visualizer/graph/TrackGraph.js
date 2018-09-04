import React, { Component } from 'react';
import { VictoryAxis, VictoryChart, VictoryLabel, VictoryScatter, VictoryTheme, VictoryTooltip, VictoryZoomContainer, LineSegment } from 'victory';
import TrackHoverDetails from './TrackHoverDetails';

class TrackGraph extends Component {
    constructor() {
        super();
        this.state = {
            externalMutations: undefined,
            chartHeight: undefined,
            chartWidth: undefined
        };
        this.setSelected = this.setSelected.bind(this);
        this.resize = this.resize.bind(this);
    }

    createEventHandler(clickedId, callback) {
        return (
            {
                childName: ["playlist", "recommended"],
                target: ["data"],
                eventKey: "all",
                mutation: (point) => {
                    return (clickedId && point.datum.id === clickedId) ?
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

    setSelected(clickedId) {
        this.setState({
            externalMutations: [
                this.createEventHandler(clickedId, this.removeMutation.bind(this))
            ]
        })
    }

    resize() {
        const posInfo = document.getElementById("Graph").getBoundingClientRect();
        this.setState({
            chartHeight: posInfo.height,
            chartWidth: posInfo.width
        });
    }
    componentDidMount() {
        this.resize();
        window.addEventListener("resize", this.resize);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.resized);
    }

    renderGraph() {
        return (
            <VictoryChart
                externalEventMutations={this.state.externalMutations}
                theme={VictoryTheme.material}
                domain={{ x: [0, 100], y: [0, 100] }}
                // containerComponent={<VictoryZoomContainer zoomDomain={{ x: [0, 100], y: [0, 100] }} />}
                containerComponent={<VictoryZoomContainer zoomDomain={this.props.startDomain} />}
                // style={{ parent: { border: "1px solid #ccc" } }}
                width={this.state.chartWidth}
                height={this.state.chartHeight}
                events={[
                    {
                        childName: ["playlist", "recommended"],
                        target: "data",
                        eventHandlers: {
                            onClick: (_, clicked) => {
                                return [
                                    this.createEventHandler(clicked.datum.id, this.props.onPointClick(clicked))
                                ]
                            }
                        }
                    }
                ]}
                padding={{ top: 15, bottom: 20, left: 20, right: 15 }}
            >
                <VictoryAxis label={this.props.dataFields.xAxis.name} axisLabelComponent={<VictoryLabel />}
                    tickLabelComponent={<VictoryLabel dy={-25} />} tickComponent={<LineSegment active={false} />} />
                <VictoryAxis label={this.props.dataFields.yAxis.name} axisLabelComponent={<VictoryLabel />}
                    tickLabelComponent={<VictoryLabel dx={33} />} tickComponent={<LineSegment active={false} />} dependentAxis />

                <VictoryScatter
                    name="playlist"
                    size={15}
                    data={this.props.graphData.playlistTracks}
                    x={this.props.dataFields.xAxis.dataFunction}
                    y={this.props.dataFields.yAxis.dataFunction}
                    labels={(d) => ""}
                    labelComponent={<VictoryTooltip flyoutComponent={<TrackHoverDetails />} />}
                />

                <VictoryScatter
                    name="recommended"
                    size={10}
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
            <div id="Graph" className="fillheight">
                {this.props.graphData ?
                    this.renderGraph() :
                    <p className="fillheight">playlist loading</p>}
            </div>
        );
    }

}

export default TrackGraph;