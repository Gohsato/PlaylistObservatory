import React, { Component } from 'react';
import { VictoryTheme, VictoryGroup, VictoryScatter } from 'victory';
import TrackPoint from './TrackPoint';
import { addSongToPlaylist, getGraphData } from '../api/spotify-controller';


class TrackGraph extends Component {
    constructor() {
        super();
        this.state = {
            // name: this.props.playlistName,
            playlistId: "2CHjVfKc0piQZcnZzYRMTP",
            graphData: undefined
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

    render() {
        return (
            <div>
                {this.state.graphData ?
                    <VictoryGroup
                        theme={VictoryTheme.material}
                        domain={{ x: [0, 10], y: [0, 10] }}
                        polar={true}
                    >
                        <VictoryScatter
                            size={7}
                            data={this.state.graphData.playlistData.tracks}
                            dataComponent={<TrackPoint onClick={this.showSong} />}
                        />

                        <VictoryScatter
                            size={20}
                            data={this.state.graphData.recommendData.tracks}
                            dataComponent={<TrackPoint fill="tomato" onClick={this.addSong} />}
                        />

                    </VictoryGroup> :
                    <p>no playlist</p>}

            </div>
        );
    }

}

export default TrackGraph;