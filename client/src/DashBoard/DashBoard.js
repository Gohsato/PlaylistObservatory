import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import { Button, Col, Row } from 'reactstrap';
import { spotifyCalls } from '../apis/spotifyHandler';
import './Dashboard.css';
import Graph from '../Graph/Graph';
import LeftBar from '../LeftBar/LeftBar';



class DashBoard extends Component {
    constructor() {
        super();
        this.state = {
            graphData: undefined,
            selected: undefined,
        }
        this.graphRef = React.createRef();
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.pointClick = this.pointClick.bind(this);
        this.pointSelect = this.pointSelect.bind(this);

        this.updateRecommendations = this.updateRecommendations.bind(this);
    }

    setGraphData(playlistTracks, recommendTracks) {
        this.setState({
            graphData: {
                playlistTracks: playlistTracks,
                recommendTracks: recommendTracks,
            }
        });
    }
    componentDidMount() {
        spotifyCalls.getGraphData(this.props.playlist.id)
            .then((response) => {
                this.setGraphData(response.playlist, response.recommended)
            })
            .catch((err) => {
                console.log(err);
            });
    }

    updateRecommendations() {
        spotifyCalls.getRecommendations(this.props.playlist.id)
            .then((response) => {
                let playlist = this.state.graphData.playlistTracks;
                this.setState({
                    graphData: {
                        recommendTracks: response,
                        playlistTracks: playlist
                    }
                })
                this.pointSelect();

            });
    }


    addTrack(track) {
        spotifyCalls.addTrackToPlaylist(track.uri, this.props.playlist.id)
            .then((response) => {
                const newRec = this.state.graphData.recommendTracks.filter(recTrack => recTrack.id !== track.id)
                this.setGraphData(response, newRec);
                this.pointSelect();
            });

    }

    removeTrack(track) {
        spotifyCalls.removeTrackFromPlaylist(track.uri, this.props.playlist.id)
            .then((response) => {
                let newRec = this.state.graphData.recommendTracks
                this.setGraphData(response, newRec)
                this.pointSelect()
            });
    }

    pointClick(selected) {
        this.setState({
            selected
        })
    }

    pointSelect(selectedSong = undefined) {
        this.setState({
            selected: selectedSong
        });
        if (this.graphRef.current) {
            const id = selectedSong ? selectedSong.id : undefined;
            this.graphRef.current.setSelected(id);
        }
    }


    render() {

        return (
            <>
                <Row id="Header" noGutters>
                        <Button id="ExitPlaylist" onClick={this.props.exitPlaylist}>
                            <FaChevronLeft/> exit playlist
                        </Button>
                        <p id="PlaylistViewTitle">
                            playlist: <b>{this.props.playlist.name}</b>
                        </p>
                </Row>
                <Row className="align-items-center body" noGutters>
                    <Col xs="3" className="fillheight">
                        <LeftBar selected={this.state.selected} pointSelect={this.pointSelect} removeTrack={this.removeTrack}
                            addTrack={this.addTrack} playlist={this.props.playlist} graphData={this.state.graphData}
                        />
                    </Col>
                    <Col xs="9" className="fillheight">
                        <Graph forwardedRef={this.graphRef} graphData={this.state.graphData} pointClick={this.pointClick}
                            updateRecommendations={this.updateRecommendations} />
                    </Col>
                </Row>
            </>
        )
    }


}

export default DashBoard;