import 'bootstrap/dist/css/bootstrap.min.css';
import './Playlist.css'
import React from 'react';
import { Col, Row, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class _TrackInfo extends React.Component {
    constructor() {
        super();
        this.state = {
            btnDropleft: false
        }
        
    }

    render() {
        const name = this.props.song.name;
        const artist = this.props.song.artists[0].name;
        return (
            <div className="PlaylistEntry">
                <Row className="align-items-center">
                    <Col>{name}</Col>
                    <Col>{artist}</Col>
                    <Col>
                        <Dropdown isOpen={this.state.btnDropleft} toggle={() => { this.setState({ btnDropleft: !this.state.btnDropleft }); }}>
                            <DropdownToggle caret/>
                            <DropdownMenu>
                                <DropdownItem onClick={()=>this.props.removeSong(this.props.song)}>
                                    one
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </Col>

                </Row>
            </div>
        )
    }
}


class PlaylistViewer extends React.Component {

    render() {
        if (!this.props.graphData) {
            return (<div>no playlist</div>)
        }
        const playlist = this.props.graphData.playlistTracks
        return (
            <div id="PlaylistView">
                {playlist.map((song) => < _TrackInfo key={song.name} song={song} removeSong={this.props.removeSong}/>)}
            </div>
        );
    }
}

export default PlaylistViewer;