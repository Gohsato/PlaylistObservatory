import { spotifyApi } from "..";
export const spotifyCalls = {

    _userId: undefined,
    getUserId:async function (){
            if (this._userId === undefined) {
                this._userId = (await spotifyApi.getMe()).id;
            }
            return this._userId;
    },


    appendAnalysis: async function (tracks) {
        let trackIds = tracks.map(x => x.id);
        let analysisResponse = await spotifyApi.getAudioFeaturesForTracks(trackIds);
        analysisResponse = analysisResponse.audio_features;
        tracks.forEach((item, index) => {
            item.analysis = analysisResponse[index];
        });
        return tracks;
    },

    getPlaylist: async function (playlistId) {
        let response = await spotifyApi.getPlaylist(playlistId);
        let newTracks = response.tracks.items.map(x => x.track);
        await this.appendAnalysis(newTracks);
        return newTracks;
    },

    _getSeeds: async function (playlistId) {
            //https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
            function shuffle(array) {
                let counter = array.length;
                while (counter > 0) {
                    let index = Math.floor(Math.random() * counter);
                    counter--;
                    let temp = array[counter];
                    array[counter] = array[index];
                    array[index] = temp;
                }
                return array;
            }
            let tracks = (await spotifyApi.getPlaylist(playlistId)).tracks;
            if(tracks.total===0){
                const options = {
                    limit:5,
                    time_range:"medium_term"
                }
                tracks = await spotifyApi.getMyTopTracks(options);
            }
            let seeds = tracks.items.map(x => x.track?x.track.id:x.id);
            shuffle(seeds);
            return seeds.slice(0, 5);
    },

    getRecommendations: async function (playlistId) {
        const seeds = await this._getSeeds(playlistId);
        let options = {
            limit: 10,
            seed_tracks: seeds,
            min_popularity: 50,
        }
        let recommendationsResponse = await spotifyApi.getRecommendations(options);
        let newTracks = await this.appendAnalysis(recommendationsResponse.tracks);
        return newTracks;
    },
    getGraphData: async function (playlistId) {
        return {
            playlist: await this.getPlaylist(playlistId),
            recommended: await this.getRecommendations(playlistId)
        };
    },

    addTrackToPlaylist: async function (songs, playlistId) {
        await spotifyApi.addTracksToPlaylist(playlistId, [songs]);
        return await this.getPlaylist(playlistId);
    },

    removeTrackFromPlaylist: async function (songs, playlistId) {
        await spotifyApi.removeTracksFromPlaylist(playlistId, [songs]);
        return await this.getPlaylist(playlistId);
    },

    getUserPlaylists: async function () {
        let playlists = await spotifyApi.getUserPlaylists();
        const userId = (await this.getUserId());
        playlists.items = playlists.items.filter((playlist) => playlist.owner.id === userId);
        return playlists
    }
}