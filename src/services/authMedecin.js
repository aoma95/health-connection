import axios from 'axios';
import authHeader from "./auth-header";

const API_URL =`${process.env.VUE_APP_URL}/api/`;

class AuthAgentService {
    login(user) {
        return axios
            .post(API_URL + 'login/agent', {
                username: user.email,
                password: user.password
            })
            .then(response => {
                if (response.data.access_token) {
                    sessionStorage.setItem('jwt', JSON.stringify(response.data));
                }
                return response.data;
            });
    }
    logout() {
        return axios
            .post(API_URL + 'logout', null,{ headers: authHeader() }
            )
            .then(response => {
                console.log(response)
                sessionStorage.removeItem('jwt');
            });
    }
}
export default new AuthAgentService();
