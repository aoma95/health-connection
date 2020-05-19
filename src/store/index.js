import Vue from 'vue';
import Vuex from 'vuex';

import { auth } from './modules/auth';
import { authMedecin } from './modules/authMedecin';
import { authAdmin } from './modules/authAdmin';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth,
        authMedecin,
        authAdmin
    }
});
