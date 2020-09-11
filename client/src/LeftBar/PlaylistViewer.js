import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Card, CardBody } from 'reactstrap';
import './LeftBar.css';
import ListTrack from './ListTrack';

class PlaylistViewer extends React.Component {

    render() {
        if (!this.props.graphData) {
            return (<div>no playlist</div>)
        }
        const playlist = this.props.graphData.playlistTracks
        return (
            <div id="PlaylistView">
                <h4>tracks:</h4>
                <Card id="PlaylistTracks">
                    <CardBody>
                        {playlist.map((track, i) =>
                            < ListTrack key={track.name + i} track={track} removeSong={this.props.removeSong}
                                pointSelect={this.props.pointSelect} i={i} />)
                        }
                        {playlist.length===0 ? <p>no tracks in this playlist... yet</p>:null}
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default PlaylistViewer;