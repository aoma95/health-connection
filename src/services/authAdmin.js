import axios from 'axios';

const API_URL =`http://192.168.0.33:84`;

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
