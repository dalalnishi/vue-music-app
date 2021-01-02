import axios from 'axios';

const state = {
    token: localStorage.getItem('token'),
    userData: {
        'firstName': localStorage.getItem('firstName'),
        'lastName': localStorage.getItem('lastName')
    }
};

const actions = {
    registerUser(context, user) {
        return new Promise((resolve, reject) => {
            axios.post('user/signUp', user).then((result) => {
                resolve(result.data);
            })
            .catch((err) => {
                console.log(err);
                reject(err.message);
            })
        });
    },

    loginUser({commit}, user) {
        return new Promise((resolve, reject) => {
            axios.post('user/signIn', user).then((result) => {
                localStorage.setItem('token', result.data.token);
                localStorage.setItem('UserID', result.data.id);
                commit('setToken');
                commit('setUserAvatar', result.data);
                resolve(result.data);
            })
            .catch((err) => {
                console.log(err);
                reject(err.message);
            })
        });
    }
}

const mutations = {
    setToken(state) {
        state.token = localStorage.getItem('token');
    },
    setUserAvatar(state, userData) {
        state.userData = userData;
        localStorage.setItem('firstName', userData.firstName);
        localStorage.setItem('lastName', userData.lastName);
    },
    removeAuth(state) {
        state.token = null;
        localStorage.removeItem('token');
        localStorage.removeItem('UserID');
    }
}

const getters = {
    getToken(state) {
        return state.token;
    }
}

export default {
    state, actions, mutations, getters
}
