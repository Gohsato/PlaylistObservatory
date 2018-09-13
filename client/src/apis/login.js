import { spotifyApi } from '..';
import queryString from 'querystring';
export function sessionStart() {

    const time = 1000*1;

    if(sessionStorage.access_token){
        spotifyApi.setAccessToken(sessionStorage.access_token);
        return setInterval(()=>refreshToken(sessionStorage.refresh_token),time);
    }

    const params = getHashParams();
    if (params.access_token) {
        sessionStorage.access_token = params.access_token;
        sessionStorage.refresh_token = params.refresh_token;

        window.history.replaceState(null, null, window.location.pathname);
        spotifyApi.setAccessToken(params.access_token);

        return setInterval(()=>refreshToken(params.refresh_token),time);
    }
    return undefined;
}



function getHashParams() {
    let parsed = queryString.parse(window.location.hash.slice(1));
    return parsed;
}

function refreshToken(refreshToken) {
    // let url = "http://localhost:8888/refresh_token/?refresh_token=" + refreshToken;
    let url = "/refresh_token/?refresh_token=" + refreshToken;
    fetch(url)
        .then((promise) => {
            promise.json().then((res) => {
                sessionStorage.access_token = res.access_token;
                spotifyApi.setAccessToken(res.access_token);
            });
        });
}
