import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Textfit } from 'react-textfit';
import { Button, Card, CardBody } from 'reactstrap';
import './LeftBar.css';
import ListTrack from './ListTrack';

class PlaylistViewer extends React.Component {

    render() {
        if (!this.props.graphData) {
            return (<div>no playlist</div>)
        }
        const playlist = this.props.graphData.playlistTracks
        console.log(playlist)
        return (
            <div id="PlaylistView">
                <div id="PlaylistViewTitle">
                    Playlist:
                    <h2 className="ellipse" title={this.props.playlistName}>
                        {this.props.playlistName}
                    </h2>
                </div>
                <Card id="PlaylistTracks">
                    <CardBody>
                        {playlist.map((track, i) =>
                            < ListTrack key={track.name + i} track={track} removeSong={this.props.removeSong}
                                pointSelect={this.props.pointSelect} i={i} />)
                        }
                        {playlist.length===0 ? <p>no tracks in this playlist... yet</p>:null}
                    </CardBody>
                </Card>
                <Button id="ExitPlaylist" onClick={this.props.exitPlaylist}>exit playlist</Button>
            </div>
        );
    }
}

export default PlaylistViewer;