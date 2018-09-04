import { spotifyApi } from "../index";
export const spotifyCalls = {

    _userId: undefined,
    _getUserId: async function () {
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
        let userId = (await this._getUserId());
        let response = await spotifyApi.getPlaylist(userId, playlistId);
        let newTracks = response.tracks.items.map(x => x.track);
        await this.appendAnalysis(newTracks);
        return newTracks;
    },

    getRecommendations: async function (playlistId) {
        //https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
        function shuffle(array) {
            let counter = array.length;

            // While there are elements in the array
            while (counter > 0) {
                // Pick a random index
                let index = Math.floor(Math.random() * counter);

                // Decrease counter by 1
                counter--;

                // And swap the last element with it
                let temp = array[counter];
                array[counter] = array[index];
                array[index] = temp;
            }

            return array;
        }

        let userId = (await this._getUserId());
        let response = await spotifyApi.getPlaylist(userId, playlistId)
        let seeds = response.tracks.items.map(x => x.track.id);
        shuffle(seeds);
        let options = {
            limit: 10,
            seed_tracks: seeds.slice(0, 5),
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
        let userId = (await this._getUserId());
        await spotifyApi.addTracksToPlaylist(userId, playlistId, [songs]);
        return await this.getPlaylist(playlistId);
    },

    removeTrackFromPlaylist: async function (songs, playlistId) {
        let userId = (await this._getUserId());
        await spotifyApi.removeTracksFromPlaylist(userId, playlistId, [songs]);
        return await this.getPlaylist(playlistId);
    },

    getUserPlaylists: async function () {
        let playlists = await spotifyApi.getUserPlaylists();
        let userId = (await this._getUserId());
        playlists.items = playlists.items.filter((playlist) => playlist.owner.id === userId);
        return playlists
    }
}