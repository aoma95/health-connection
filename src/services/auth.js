import axios from 'axios';

const API_URL =`http://192.168.160.25:81`;

class AuthService {
    login(user) {
        return axios
            .post(API_URL + '?action=login', {
                identifiant: user.identifiant,
                password: user.password,
                role: user.role,
            });
    }

    register(user) {
        return axios
            .post(API_URL + '?action=register', {
            identifiant: user.identifiant,
            password: user.password,
            c_password: user.c_password,
            role: user.role === "Médecin" ? "medecin" : "citoyen",
        });
    }
}
export default new AuthService();
