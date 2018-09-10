import React from 'react';
import { spotifyCalls } from '../apis/spotifyHandler';
import DashBoard from '../DashBoard/DashBoard';
import PlaylistList from './PlaylistList'

import './PlaylistSelect.css'
import Textfit from 'react-textfit/lib/Textfit';

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
        spotifyCalls.getUserPlaylists()
        .then((playlistPaginator) => {
            this.setState({
                listOfplaylists: playlistPaginator.items
            })
        })
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