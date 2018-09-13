import React from "react";
import { Button, Card, CardBody, CardImg, CardText, CardTitle, Jumbotron } from 'reactstrap';
import './PlaylistSelect.css';


function PlaylistOption(props) {
    const playlist = props.playlist;

    const img = playlist.images[0] ?
        <CardImg top width="100%" src={playlist.images[0].url} height={150} alt="playlistImage" /> :
        <div className="noImage">no image</div>;

    const numberOfTracks = playlist.tracks.total;

    return (
        <Card className="PlaylistOption">
            {img}
            <CardBody>
                <CardTitle className="width">
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
            <Jumbotron>
                <h1>PlaylistSelector</h1>
                <p>Choose your fighter! (your playlist needs at least one track)</p>
                <div id="Center">
                    <div id="PlaylistDisplay">{playlists}</div>
                </div>
            </Jumbotron>
    )
}

export default PlaylistList;