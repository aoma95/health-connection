import AuthMedecinService from '../../services/authMedecin';

const user = JSON.parse(localStorage.getItem('jwt'));
const initialState = user
    ? { status: { loggedIn: true }, user }
    : { status: { loggedIn: false }, user: null };

export const authMedecin = {
    namespaced: true,
    state: initialState,
    actions: {
        login({ commit }, user) {
            return AuthAgentService.login(user).then(
                user => {
                    commit('loginSuccess', user);
                    return Promise.resolve(user);
                },
                error => {
                    commit('loginFailure');
                    return Promise.reject(error);
                }
            );
        },
        logout({ commit }) {
            AuthAgentService.logout();
            commit('logout');
        }
    },
    mutations: {
        loginSuccess(state, user) {
            state.status.loggedIn = true;
            state.user = user;
        },
        loginFailure(state) {
            state.status.loggedIn = false;
            state.user = null;
            sessionStorage.removeItem('jwt');
        },
        logout(state) {
            state.status.loggedIn = false;
            state.user = null;
        }
    }
};
