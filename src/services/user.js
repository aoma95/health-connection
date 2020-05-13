import axios from 'axios';
import authHeader from './auth-header';

const API_URL = `${process.env.VUE_APP_URL}/api/`;

class UserService {
    getProfil() {
        return axios.get(API_URL + 'users', { headers: authHeader() });
    }

}
export default new UserService();
