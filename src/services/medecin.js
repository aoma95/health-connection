import paho from 'paho-mqtt';
const org = 'mbrym4';
const deviceType = 'iot-client';
const apiKey = 'a-mbrym4-5wqfprmqaw';
const apiToken = '?nl*lfM5jdMKDp@1w8';
let client;

// Get identified user
const user = JSON.parse(sessionStorage.getItem('user'));

class MedecinService {

    /**
     * Store a patient to local storage
     *
     * @param identifiant
     */
    addPatient(identifiant) {
        let currentPatients = JSON.parse(localStorage.getItem(user.identifiant));

        if (currentPatients === null) {
            console.log('Récupération lors ajout null');
            currentPatients = [];
        }

        let newPatient = {
            'identifiant': identifiant,
            'temperature': null,
            'health': null
        }
        currentPatients.push(newPatient);

        localStorage.setItem(user.identifiant, JSON.stringify(currentPatients));
    }

    /**
     * Get all registered patients in local storage
     *
     * @returns {{identifiant: string}[]|any}
     */
    getPatients() {
        let patients = JSON.parse(localStorage.getItem(user.identifiant));
        if (patients !== null) {
            return patients;
        } else {
            console.log('Récupération null');
            return [{
                identifiant: 'Pas de patients enregistrés'
            }];
        }
    }

    publishHealth(identifiant, status) {
        const clientId = 'a:' + org + ':' + apiKey;
        client = new paho.Client(org + '.messaging.internetofthings.ibmcloud.com', 8883, clientId);

        client.onConnectionLost = this.onConnectionLost;
        client.onMessageArrived = this.onMessageArrived;

        let topic = "iot-2/type/" + deviceType + "/id/" + identifiant + "/evt/health/fmt/json";
        let payload = {
            "health": status
        }

        client.connect({
            onSuccess: function () {
                let message = new paho.Message(JSON.stringify(payload));
                message.destinationName = topic;

                try {
                    client.send(message);
                    console.log(topic + ' send');
                } catch (e) {
                    console.log(e);
                    console.log(topic + ' not send');
                }
            },
            onFailure: function() {console.log('Connection failed')},
            userName: apiKey,
            password: apiToken,
            useSSL: true,
        });
    }

    /**
     * Client lose connection to broker
     *
     * @param responseObject
     */
    onConnectionLost(responseObject) {
        if (responseObject.errorCode !== 0) {
            console.log("onConnectionLost:" + responseObject.errorMessage);
        }
    }

    /**
     * Get message on subscribe
     *
     * @param message
     */
    onMessageArrived(message) {
        console.log("onMessageArrived:" + message.payloadString);
    }
}
export default new MedecinService();
