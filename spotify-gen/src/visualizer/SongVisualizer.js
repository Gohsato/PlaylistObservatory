import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';
import { addSongToPlaylist, getGraphData, removeSongFromPlaylist } from '../api/spotify-controller';
import ControlPanel from './ControlPanel';
import { Axis, AXIS_UNITS } from './graph/graphParams';
import TrackGraph from './graph/TrackGraph';
import PlaylistViewer from './PlaylistViewer';



class SongVisualizer extends Component {
    constructor() {
        super();
        this.state = {
            dataFields:{
                xAxis: new Axis(AXIS_UNITS.danceability),
                yAxis: new Axis(AXIS_UNITS.energy)
            },
            graphData: undefined,
            selected: undefined
        }
        this.playlistId = "2CHjVfKc0piQZcnZzYRMTP";
        this.addSong = this.addSong.bind(this);
        this.removeSong = this.removeSong.bind(this);
        this.pointClick = this.pointClick.bind(this);
    }

    setGraphData(playlistTracks,recommendTracks){
        this.setState({
            graphData: {
                playlistTracks: playlistTracks,
                recommendTracks: recommendTracks,
            }
        });
    }
    componentDidMount() {
        getGraphData(this.playlistId)
            .then((response) => {
                this.setGraphData(response.playlist,response.recommended)
            })
            .catch((err) => {
                console.log(err);
            });
    }

    
    addSong(song, index) {
        addSongToPlaylist(song.uri, this.playlistId)
            .then((response) => {
                this.setState((prevState) => {
                    prevState.graphData.recommendTracks.splice(index, 1)
                    return {
                        graphData: {
                            recommendTracks: prevState.graphData.recommendTracks,
                            playlistTracks: response
                            
                        }
                    };
                });
            });

    }

    removeSong(song){
        removeSongFromPlaylist(song.uri, this.playlistId)
        .then((response) => {
            let newRec = this.state.graphData.recommendTracks.slice()
            this.setGraphData(response,newRec)
        });
    }

    pointClick(selected){
        if(selected.id.startsWith("recommended")){
            this.addSong(selected.datum,selected.index);
        }
        this.setState({
            selected
        })
    }
    render() {
        return (
            <div className="Visualizer">
                <button onClick={()=>{
                    this.setState({
                        selected:undefined
                    })
                    if(this.graph)this.graph.setSelected();
                }}>clear</button>
                <Row className="align-items-center Visualizer" noGutters>
                    <Col xs="3" className="limit">
                        {this.state.selected?<h1>{this.state.selected.datum.name}</h1>:<PlaylistViewer graphData={this.state.graphData} removeSong={this.removeSong}/>}
                        
                    </Col>
                    <Col xs="7">
                        <TrackGraph dataFields={this.state.dataFields} 
                         graphData={this.state.graphData}
                         onPointClick={this.pointClick}
                         addSong={this.addSong}
                         ref={foo=>this.graph=foo}/>
                    </Col>
                    <Col xs="2">
                        <ControlPanel dataFields={this.state.dataFields}
                            onChange={(newFields)=>this.setState({dataFields:newFields})}
                            />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default SongVisualizer;