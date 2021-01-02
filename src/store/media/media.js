import axios from 'axios';

const state = {
    tracks: []
};

const actions = {
    getAllTracks({commit}) {
        return new Promise((resolve, reject) => {
            const uid = localStorage.getItem('UserID');
            axios.get('track/allTracks/'+uid).then((result) => {
                commit('setTrackData', result.data);
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
        state.tracks = data;
    }
}

export default {
    state, actions, mutations
}
