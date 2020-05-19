import axios from 'axios';
import authHeader from './auth-header';

const API_URL = `${process.env.VUE_APP_URL}/api/`;

class AdminService {
    bbla() {
        return axios.get(API_URL + 'blabla', { headers: authHeader() });
    }
}
export default new AdminService();
