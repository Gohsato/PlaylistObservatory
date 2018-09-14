import React from "react";
import { Button, Card, CardBody, CardImg, CardText, CardTitle, Jumbotron } from 'reactstrap';
import './PlaylistSelect.css';
import {FaMusic} from 'react-icons/fa'


function NoImage(){
    return(
        <div className="noImage"><FaMusic/><p>no image</p></div>
    )
}

function PlaylistOption(props) {
    const playlist = props.playlist;

    const img = playlist.images[0] ?
        <CardImg top width="100%" src={playlist.images[0].url} height={150} alt="playlistImage" /> :
       <NoImage/>;

    const numberOfTracks = playlist.tracks.total;

    return (
        <Card className="PlaylistOption">
            {img}
            <CardBody>
                <CardTitle className="width" title={playlist.name}>
                    {playlist.name}
                </CardTitle>
                <CardText>
                    {numberOfTracks} tracks
                </CardText>
                <Button onClick={() => props.setPlaylist(playlist)}>select</Button>
            </CardBody>
        </Card>
    )
}

function PlaylistList(props) {
    let playlists;
    if (props.listOfplaylists) {
        playlists = props.listOfplaylists.map(playlist =>
            <PlaylistOption key={playlist.id} playlist={playlist} setPlaylist={props.setPlaylist} />)
    }
    return (
            <Jumbotron id="PlaylistList">
                <h1>Select a Playlist</h1>
                <p>Choose a playlist to visualize and edit</p>
                <div id="Center">
                    <div id="PlaylistDisplay">{playlists}</div>
                    {props.listOfplaylists?null:<p>you need to create a playlist on spotify first</p>}
                </div>
            </Jumbotron>
    )
}

export default PlaylistList;