import React from "react";
import { Textfit } from 'react-textfit';
import { Button } from 'reactstrap';

function PlaylistOption(props) {
    const playlist = props.playlist
    return (
        <div className="PlaylistOption">
            <img src={playlist.images[0].url} height={150} alt="playlistImage" />
            <Textfit mode="single" max={34}>
                {playlist.name}
            </Textfit>
            <Button onClick={() => props.setPlaylist(playlist)}>select</Button>
        </div>
    )
}

function PlaylistList(props){
    let playlists;
    if (props.listOfplaylists) {
        playlists = props.listOfplaylists.map(playlist =>
            <PlaylistOption key={playlist.id} playlist={playlist} setPlaylist={props.setPlaylist} />)
    }
    return (
        <div>
            <h1>PlaylistSelector</h1>
            <div id="PlaylistDisplay">{playlists}</div>
        </div>
    )
}

export default PlaylistList;