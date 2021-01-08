import axios from 'axios';

const state = {
    tracks: [],
    searchResult: []
};

const actions = {
    getAllTracks({commit}, data) {
        return new Promise((resolve, reject) => {
            const uid = localStorage.getItem('UserID');
            axios.get('track/allTracks/'+uid+'/'+data.currentPage+'/'+data.limit).then((result) => {
                commit('setTrackData', result.data);
                resolve(result.data);
            })
            .catch((err) => {
                console.log(err);
                reject(err.message);
            })
        });
    },
    searchRecords({commit}, data) {
        return new Promise((resolve, reject) => {
            const uid = localStorage.getItem('UserID');
            axios.get('track/search/'+uid+'?searchString='+data.searchString).then((result) => {
                commit('setSearchResult', result.data);
                resolve(result.data);
            })
            .catch((err) => {
                console.log(err);
                reject(err.message);
            })
        });
    },
}

const mutations = {
    setTrackData(state, data) {
        state.tracks = state.tracks.concat(data);
    },
    setSearchResult(state, data) {
        state.searchResult = data;
    },
    clearData() {
        state.tracks = [];
    },
    userLike(state, track) {
        let data = [...state.tracks];
        let index = data.findIndex(obj => obj.Track_id === track.Track_id);
        data[index].like = !data[index].like;                
        state.tracks = data;
    }
}

export default {
    state, actions, mutations
}
