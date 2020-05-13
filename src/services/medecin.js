import axios from 'axios';
import authHeader from "./auth-header";

const API_URL =`${process.env.VUE_APP_URL}/api/`;

class AuthService {
    login(user) {
        return axios
            .post(API_URL + 'login', {
                email: user.email,
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

    register(user) {
        return axios.post(API_URL + 'register', {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            password: user.password,
            c_password: user.c_password,
            phone: user.phone,
            address: user.address,
            postal_code: user.postal_code,
            city: user.city,
            birth_date: user.birth_date,
            agency_id: user.agency_id,
            assigned_agent: user.assigned_agent
        });
    }
}
export default new AuthService();
