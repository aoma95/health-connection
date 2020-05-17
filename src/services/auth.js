import axios from 'axios';

const API_URL =`http://health-connection.local:81`;

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
            conf_password: user.conf_password,
            role: user.role === "Médecin" ? "medecin" : "citoyen",
        });
    }
}
export default new AuthService();
