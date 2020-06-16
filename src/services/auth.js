import axios from 'axios';
import paho from 'paho-mqtt';

const API_URL =`http://192.168.160.25:81`;
const org = 'mbrym4';
const deviceType = 'iot-client';

class AuthService {
    login(user) {
        return axios
            .post(API_URL + '?action=login', {
                identifiant: user.identifiant,
                password: user.password,
                role: user.role,
            })
            .then(response => {
                console.log(response);
                let clientId = 'd:' + org + ':' + deviceType + ':' + user.identifiant;
                let client = new paho.Client(org + '.messaging.internetofthings.ibmcloud.com', 8883, clientId);

                client.connect({
                    onSuccess: function() {console.log('yes')},
                    onFailure: function() {console.log('no')},
                    userName: "use-token-auth",
                    password: user.password,
                    useSSL: true,
                });
                sessionStorage.setItem('citoyen', JSON.stringify(user));
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
