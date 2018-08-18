import { spotifyApi } from "../index";


export async function getPlaylist() {

    let playlist_response = await spotifyApi.getPlaylist("hobogoh", "5ZumklTv3uMpvc1CqXS6MF")
    
    let tracks = playlist_response.tracks.items.map(x => x.track.id);
    let analysis_response = await spotifyApi.getAudioFeaturesForTracks(tracks)
    analysis_response = analysis_response.audio_features;

    playlist_response.tracks.items.forEach((item,index)=>{
        item.track.analysis = analysis_response[index];
    });
    console.log(playlist_response.tracks.items);
    

    return {
        tracks: playlist_response.tracks.items.map(x=>x.track),
        name: playlist_response.name
    }
}