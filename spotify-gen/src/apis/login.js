import { spotifyApi } from '..';
import queryString from 'querystring';
export function sessionStart() {
    const tok = spotifyApi.getAccessToken();
    console.log(tok);

    const params = getHashParams();
    console.log(params);

    if (params.access_token) {
        spotifyApi.setAccessToken(params.access_token);

        const time = 1000*55;
        return setInterval(()=>refreshToken(params.refresh_token),time);
    }
    return undefined;
}



function getHashParams() {
    let parsed = queryString.parse(window.location.hash.slice(1));
    return parsed;
}

function refreshToken(refreshToken) {
    console.log("refresh");
    let url = "http://localhost:8888/refresh_token/?refresh_token=" + refreshToken;
    fetch(url)
        .then((promise) => {
            promise.json().then((res) => {
                spotifyApi.setAccessToken(res.access_token);
            });
        });
}
