import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import AuthStore from './auth/auth';
import MediaStore from './media/media';
import UserActionsStore from './userActions/userActions';

export const store = new Vuex.Store({
    modules: {
        AuthStore,
        MediaStore,
        UserActionsStore
    }
})