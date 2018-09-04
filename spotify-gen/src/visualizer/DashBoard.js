import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';
import { spotifyCalls } from '../api/spotify-controller';
import './Dashboard.css';
import Graph from './graph/Graph';
import LeftBar from './LeftBar/LeftBar';



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
        this.pointDeSelect = this.pointDeSelect.bind(this);

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
            this.pointDeSelect();
            
            });
    }


    addTrack(track) {
        console.log(track);
        spotifyCalls.addTrackToPlaylist(track.uri, this.props.playlist.id)
            .then((response) => {
                const newRec = this.state.graphData.recommendTracks.filter(recTrack => recTrack.id !== track.id)
                this.setGraphData(response, newRec);
                this.pointDeSelect();
            });

    }

    removeTrack(track) {
        spotifyCalls.removeTrackFromPlaylist(track.uri, this.props.playlist.id)
            .then((response) => {
                let newRec = this.state.graphData.recommendTracks
                this.setGraphData(response, newRec)
                this.pointDeSelect()
            });
    }

    pointClick(selected) {
        this.setState({
            selected
        })
    }

    pointDeSelect() {
        this.setState({
            selected: undefined
        });
        if (this.graphRef.current) {
            this.graphRef.current.setSelected();
        }
    }


    render() {

        return (
            <Row className="align-items-center fillheight" noGutters>
                <Col xs="3" className="fillheight">
                    <LeftBar selected={this.state.selected} pointDeSelect={this.pointDeSelect} removeTrack={this.removeTrack}
                        addTrack={this.addTrack} playlist={this.props.playlist} graphData={this.state.graphData} 
                        exitPlaylist={this.props.exitPlaylist} />
                </Col>
                <Col xs="9" className="fillheight">
                    <Graph forwardedRef={this.graphRef} graphData={this.state.graphData} pointClick={this.pointClick} 
                    updateRecommendations={this.updateRecommendations}/>
                </Col>
            </Row>
        )
    }


}

export default DashBoard;