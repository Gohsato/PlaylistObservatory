import React, { Component } from 'react';
import { VictoryTheme, VictoryGroup } from 'victory';
import { VictoryScatter } from 'victory-scatter';
import TrackPoint from './TrackPoint';
import {getPlaylist} from '../api/spotify-controller';


class TrackGraph extends Component {
    constructor() {
        super();
        this.state = {
            playlist: undefined
        }
    }
    componentDidMount() {

        getPlaylist()
            .then((response) => {
                this.setState({
                    playlist: {
                        tracks: response.tracks,
                        name: response.name
                    }
                })
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {
        return (
            <div>
                {this.state.playlist ?
                    <VictoryGroup
                        theme={VictoryTheme.material}
                        domain={{ x: [0, 5], y: [0, 7] }}
                        polar={true}
                    >
                        <VictoryScatter
                            style={{ data: { fill: "#c43a31" } }}
                            size={7}
                            data={this.state.playlist.tracks}
                            dataComponent={<TrackPoint />}
                        />
                    </VictoryGroup> :
                    <p>no playlist</p>}

            </div>
        );
    }

}

export default TrackGraph;