import { Client, UserHandler, PlaylistHandler, ArtistHandler } from 'spotify-sdk';
let client = Client.instance;

client.settings = {
  clientId: '9bfa169d7c354b3c88772c696413f1ec',
  secretId: '292cb964135f4b7abcf59dcbb0ad2b7a',
  scopes: ['user-read-private', ' user-read-email ', 'playlist-modify-private', ' playlist-read-private'],
  redirect_uri: 'http://localhost:3000/callback/'
};

client.token = 'TOKEN';

var user = new UserHandler();

export function session() {
    if (sessionStorage.token) {
        client.token = sessionStorage.token;
        return false;
    } else if (window.location.hash.split('&')[0].split('=')[1]) {
        sessionStorage.token = window.location.hash.split('&')[0].split('=')[1];
        client.token = sessionStorage.token;
        return true;
    }
}

export function login(){
    client.login().then((url) => {
        window.location.href = url;
    });
}

export async function getPlaylist(playlistId){
    let me = await user.me();
    let playlistEntity = await me.playlists(playlistId);
    console.log(playlistEntity);
}