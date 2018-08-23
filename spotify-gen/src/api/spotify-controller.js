import { spotifyApi } from "../index";


export async function getGraphData(playlist) {
    var userId = (await spotifyApi.getMe()).id;
    return {
        playlist: await getPlaylist(userId, playlist),
        recommended: await getRecommendations(userId, playlist)
    };
}

async function getPlaylist(userId, playlist) {
    let response = await spotifyApi.getPlaylist(userId, playlist);
    let newTracks = response.tracks.items.map(x => x.track);
    await appendAnalysis(newTracks);
    return newTracks;
}

async function getRecommendations(userId, playlist) {
    let response = await spotifyApi.getPlaylist(userId, playlist)
    let seeds = response.tracks.items.map(x => x.track.id);
    //TODO: make this better
    let options = {
        limit: 10,
        market: 'CA',
        seed_tracks: seeds.slice(0, 5),
        min_popularity: 50,
    }
    let recommendationsResponse = await spotifyApi.getRecommendations(options);
    let newTracks = await appendAnalysis(recommendationsResponse.tracks);
    return newTracks;
}

async function appendAnalysis(tracks) {
    let trackIds = tracks.map(x => x.id);
    let analysisResponse = await spotifyApi.getAudioFeaturesForTracks(trackIds);
    analysisResponse = analysisResponse.audio_features;
    tracks.forEach((item, index) => {
        item.analysis = analysisResponse[index];
    });
    return tracks;
}

export async function addSongToPlaylist(songs, playlist) {
    let userId = (await spotifyApi.getMe()).id;
    await spotifyApi.addTracksToPlaylist(userId, playlist, [songs]);
    return await getPlaylist(userId,playlist);
}

export async function removeSongFromPlaylist(songs,playlist){
    let userId = (await spotifyApi.getMe()).id;
    await spotifyApi.removeTracksFromPlaylist(userId, playlist, [songs]);
    return await getPlaylist(userId,playlist);
}