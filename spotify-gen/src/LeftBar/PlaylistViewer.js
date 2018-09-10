import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Textfit } from 'react-textfit';
import { Button, Card, CardBody, Jumbotron } from 'reactstrap';
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
                    <div id="PlaylistViewTitle">
                        Playlist:
                    <Textfit mode="single" max={28}>
                            {this.props.playlistName}
                        </Textfit>
                    </div>
                    <Card id="PlaylistTracks">
                        <CardBody>
                            {playlist.map((track, i) =>
                                < ListTrack key={track.name + i} track={track} removeSong={this.props.removeSong}
                                    pointSelect={this.props.pointSelect} i={i} />)
                            }
                        </CardBody>
                    </Card>
                    <Button id="ExitPlaylist" onClick={this.props.exitPlaylist}>exit playlist</Button>
            </div>
        );
    }
}

export default PlaylistViewer;