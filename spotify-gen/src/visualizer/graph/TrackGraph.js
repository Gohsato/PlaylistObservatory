import React, { Component } from 'react';
import { VictoryTheme, VictoryScatter, VictoryZoomContainer, VictoryChart, VictoryAxis, VictoryLabel } from 'victory';
import { addSongToPlaylist, getGraphData } from '../../api/spotify-controller';
import "../../App.css";

class TrackGraph extends Component {
    constructor() {
        super();
        this.state = {
            // name: this.props.playlistName,
            playlistId: "2CHjVfKc0piQZcnZzYRMTP",
            graphData: undefined,
        }
        this.addSong = this.addSong.bind(this);
        this.showSong = this.showSong.bind(this);

    }
    componentDidMount() {
        getGraphData(this.state.playlistId)
            .then((response) => {
                this.setState({
                    graphData: {
                        playlistData: {
                            tracks: response.playlist,
                        },
                        recommendData: {
                            tracks: response.recommended,
                        }
                    }
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    addSong(song, index) {
        this.showSong(song);
        addSongToPlaylist(song.uri, this.state.playlistId)
            .then((response) => {
                this.setState((prevState) => {
                    prevState.graphData.recommendData.tracks.splice(index, 1)
                    return {
                        graphData: {
                            recommendData: {
                                tracks: prevState.graphData.recommendData.tracks
                            },
                            playlistData: {
                                tracks: response
                            }
                        }
                    };
                });
            });

    }

    showSong(song) {
        console.log(song.name + " - " + song.artists[0].name)
    }

    renderGraph() {
        let widthRatio = 1.5
        return (
        <VictoryChart
            theme={VictoryTheme.material}
            domain={{ x: [0, 100], y: [0, 100] }}
            containerComponent={<VictoryZoomContainer zoomDomain={{ x: [0, 100], y: [0, 100] }} />}
            // animate={{ duration: 5000, easing: "bounce" }}
            style={{ parent: { maxWidth: window.innerHeight, border: "1px solid #ccc" } }}
            width={500}
            height={500}
        >
            <VictoryAxis label={this.props.dataFields.xAxis.name} axisLabelComponent={<VictoryLabel dy={20} />} />
            <VictoryAxis label={this.props.dataFields.yAxis.name} axisLabelComponent={<VictoryLabel dy={-20} />} dependentAxis />

            <VictoryScatter
                size={7}
                data={this.state.graphData.playlistData.tracks}
                x={this.props.dataFields.xAxis.dataFunction}
                y={this.props.dataFields.yAxis.dataFunction}
                events={[
                    {
                        target: "data",
                        eventHandlers: {
                            onClick: (_, props) => {
                                this.showSong(props.datum, props.index);
                            }
                        }
                    }
                ]}
            />

            <VictoryScatter
                size={7}
                data={this.state.graphData.recommendData.tracks}
                x={this.props.dataFields.xAxis.dataFunction}
                y={this.props.dataFields.yAxis.dataFunction}
                style={{
                    data: {
                        fill: "tomato"
                    }
                }}
                events={[
                    {
                        target: "data",
                        eventHandlers: {
                            onClick: (_, props) => {
                                this.addSong(props.datum, props.index);
                            }
                        }
                    }
                ]}
            />
        </VictoryChart>);
    }

    render() {
        return (
            <div>
                {this.state.graphData ?
                    this.renderGraph() :
                    <p>no playlist</p>}

            </div>
        );
    }

}

export default TrackGraph;