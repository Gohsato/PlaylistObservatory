import axios from 'axios';
import { spotifyApi } from "./spotifyHandler";

const scope = 'user-read-private user-read-email playlist-modify-private playlist-read-private user-top-read';
const SESSION_KEYS = {
    token: 'spotify-access-token',
    refresh_token: 'spotify-refresh-token',
    code_verifier: 'spotify-code-verifier',
    state: 'spotify-state',
    expires_at: 'spotify-token-expires-at'
}

function generateRandomString(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

function sha256(plain) {
    // https://stackoverflow.com/a/59913241
    // returns promise ArrayBuffer
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return window.crypto.subtle.digest('SHA-256', data);
}

function base64urlencode(a) {
    // https://stackoverflow.com/a/59913241
    // Convert the ArrayBuffer to string using Uint8 array.
    // btoa takes chars from 0-255 and base64 encodes.
    // Then convert the base64 encoded to base64url encoded.
    // (replace + with -, replace / with _, trim trailing =)
    return btoa(String.fromCharCode.apply(null, new Uint8Array(a)))
        .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export async function login() {
    const code_verifier = generateRandomString(115);
    const hash = await sha256(code_verifier);
    const code_challenge = base64urlencode(hash, true);
    const state = generateRandomString(8);

    sessionStorage.setItem(SESSION_KEYS.code_verifier, code_verifier);
    sessionStorage.setItem(SESSION_KEYS.state, state);

    const uri = `https://accounts.spotify.com/authorize` +
        `?response_type=code&client_id=${process.env.REACT_APP_SPOTIFY_CLIENT_ID}&` +
        `redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&scope=${scope}&state=${state}&` +
        `code_challenge=${code_challenge}&code_challenge_method=S256`;

    window.open(uri, "_self");
}

export async function sessionStart() {

    // Check if already logged in
    if (sessionStorage.getItem(SESSION_KEYS.token) !== null) {
        console.log('found access token');

        spotifyApi.setAccessToken(sessionStorage.getItem(SESSION_KEYS.token));
        try {
            await spotifyApi.getMe();
        } catch (err) {
            console.log(err)
            return await refreshToken();
        }
        return true;
    }

    // Handle redirect
    const params = new URLSearchParams(window.location.search.slice(1));
    if (params.has('state') && params.get('state') !== sessionStorage.getItem(SESSION_KEYS.state)) {
        console.log('login failed');
        return false;
    }
    if (params.has('code')) {
        console.log('getting token');
        const postBody = {
            client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
            grant_type: 'authorization_code',
            code: params.get('code'),
            redirect_uri: process.env.REACT_APP_REDIRECT_URI,
            code_verifier: sessionStorage.getItem(SESSION_KEYS.code_verifier),
        };
        return requestToken(postBody);

    } else if (params.has('error')) {
        console.log('login failed');
    }

    return false;
}

async function requestToken(postBody) {
    const urlEncodedPostBody = new URLSearchParams(postBody);
    try {
        const res = await axios.post('https://accounts.spotify.com/api/token', urlEncodedPostBody, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;",
            },
        });
        sessionStorage.setItem(SESSION_KEYS.token, res.data.access_token);
        sessionStorage.setItem(SESSION_KEYS.expires_at, (new Date()).getTime() + (res.data.expires_in * 1000));
        sessionStorage.setItem(SESSION_KEYS.refresh_token, res.data.refresh_token);
        spotifyApi.setAccessToken(sessionStorage.getItem(SESSION_KEYS.token));
        setTimeout(refreshToken, 1000 * (res.data.expires_in - 60));
        return true;
    } catch (err) {
        console.log("token request failed");
        console.log(err);
        return false
    }
}

async function refreshToken() {
    console.log('refresh token');
    const postBody = {
        client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
        grant_type: 'refresh_token',
        refresh_token: sessionStorage.getItem(SESSION_KEYS.refresh_token)
    };

    return requestToken(postBody);
}

