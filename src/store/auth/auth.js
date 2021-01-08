import axios from 'axios';

const state = {
    token: localStorage.getItem('token'),
    userData: {
        'firstName': localStorage.getItem('firstName'),
        'lastName': localStorage.getItem('lastName')
    }
};

const actions = {
    registerUser(context, newUser) {
        return new Promise((resolve, reject) => {
            axios.post('user/signUp', newUser).then((result) => {
                resolve(result.data);
            })
            .catch((err) => {
                console.log(err);
                reject(err.message);
            })
        });
    },

    loginUser({commit}, userCredentials) {
        return new Promise((resolve, reject) => {
            axios.post('user/signIn', userCredentials).then((result) => {
                const { user } = result.data;
                localStorage.setItem('token', result.data.token);
                localStorage.setItem('UserID', user.id);
                commit('setToken');
                commit('setUserAvatar', user);
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
        state.userData = {
            firstName: '',
            lastName: ''
        };
        localStorage.removeItem('token');
        localStorage.removeItem('UserID');
        localStorage.removeItem('firstName');
        localStorage.removeItem('lastName');
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
