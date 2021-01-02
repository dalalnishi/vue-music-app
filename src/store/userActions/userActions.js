import axios from 'axios';

const state = {
    userLikes: []
};

const actions = {
    getUserFavourites({commit}, uid) {
        return new Promise((resolve, reject) => {
            axios.get('likes/userLikes/'+uid).then((result) => {
                commit('setUserFavourites', result.data);
                resolve(result.data);
            })
            .catch((err) => {
                console.log(err);
                reject(err.message);
            })
        });
    },
    addUserFavourites(context, data) {
        return new Promise((resolve, reject) => {
            axios.post('likes/add', data).then((result) => {
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
    setUserFavourites(state, data) {
        state.userLikes = data;
    }
}

export default {
    state, actions, mutations
}
