import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Button, Col, Container, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'reactstrap';
import './LeftBar.css';
import { Textfit } from 'react-textfit';

class TrackInfo extends React.Component {
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
                <Container>
                    <Row className="align-items-center">
                        <Col xs="9">
                            <h1>{name}</h1>
                            <h2>{artist}</h2>
                        </Col>
                        <Col xs="3">
                            <Dropdown isOpen={this.state.btnDropleft} toggle={() => { this.setState({ btnDropleft: !this.state.btnDropleft }); }}>
                                <DropdownToggle caret />
                                <DropdownMenu>
                                    <DropdownItem onClick={() => this.props.removeSong(this.props.song)}>
                                        Delete Song
                                </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </Col>

                    </Row>
                </Container>
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
                <Textfit mode="single" max={34}>
                    {this.props.playlistName}
                </Textfit>
                <div id="PlaylistTracks">
                    {playlist.map((song, i) => < TrackInfo key={song.name + i} song={song} removeSong={this.props.removeSong} />)}
                </div>
                <Button id="ExitPlaylist" onClick={this.props.exitPlaylist}>exit playlist</Button>
            </div>
        );
    }
}

export default PlaylistViewer;