import axios from 'axios';

const API_URL =`http://health-connection.local:81`;

class AuthAdminService {
    login(user) {
        return axios
            .post(API_URL + '?action=login', {
                identifiant: user.identifiant,
                password: user.password,
                role: user.role,
            });
    }
}
export default new AuthAdminService();
