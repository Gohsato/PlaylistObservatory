import React from 'react';
import { spotifyCalls } from '../api/spotify-controller';
import DashBoard from '../visualizer/DashBoard';
import PlaylistList from './PlaylistList'


class PlaylistSelector extends React.Component {
    constructor() {
        super();
        this.state = {
            listOfplaylists: undefined,
            playlist: undefined,
        }
        this.setPlaylist = this.setPlaylist.bind(this);
        this.exitPlaylist = this.exitPlaylist.bind(this);
    }


    setPlaylist(playlist) {
        
        this.setState({
            playlist
        });
    }

    exitPlaylist() {
        this.setPlaylist(undefined);
    }


    componentDidMount() {
        spotifyCalls.getUserPlaylists()
            .then((playlistPaginator) => {
                this.setState({
                    listOfplaylists: playlistPaginator.items
                })
            })
    }


    render() {
        if (this.state.playlist) {
            return <DashBoard playlist={this.state.playlist} exitPlaylist={this.exitPlaylist} />
        } else {
            return <PlaylistList listOfplaylists={this.state.listOfplaylists} setPlaylist={this.setPlaylist}/>
        }
    }

}

export default PlaylistSelector;