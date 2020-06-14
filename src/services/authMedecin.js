import axios from 'axios';

const API_URL =`http://192.168.160.25:81`;

class AuthAgentService {
    login(user) {
        return axios
            .post(API_URL + '?action=login', {
                identifiant: user.identifiant,
                password: user.password,
                role: user.role,
            })
            .then(response => {
                console.log(response);
                sessionStorage.setItem('user', JSON.stringify(user));
            });
    }
}
export default new AuthAgentService();
