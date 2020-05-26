import paho from 'paho-mqtt';

const org = 'mbrym4';
const deviceType = 'iot-client';
const apiKey = 'a-mbrym4-rdf3lojgwv';
const apiToken = '5jq*9Dca6UBOQQhQpG';
let client;
let user;

class CitoyenService {

    /**
     * Connection to publish
     *
     * @param topic
     * @param payload
     */
    initConnection(topic, payload) {
        // Get identified user
        user = JSON.parse(sessionStorage.getItem('user'));
        // Create client
        const clientId = 'd:' + org + ':' + deviceType + ':' + user.identifiant;
        client = new paho.Client(org + '.messaging.internetofthings.ibmcloud.com', 8883, clientId);

        client.onConnectionLost = this.onConnectionLost;
        client.onMessageArrived = this.onMessageArrived;

        // Connect client to publish payload
        client.connect({
            onSuccess: function () {
                let message = new paho.Message(JSON.stringify(payload));
                message.destinationName = "iot-2/evt/"+ topic +"/fmt/json";

                try {
                    client.send(message);
                    console.log(topic + ' send');
                } catch (e) {
                    console.log(e);
                    console.log(topic + ' not send');
                }
            },
            onFailure: function() {console.log('Connection failed')},
            userName: "use-token-auth",
            password: user.password,
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

    /**
     * Publish temperature
     *
     * @param temperature
     */
    pushTemperature(temperature) {
        let payload = {
            "t": temperature
        };
        this.initConnection("temperature", payload);
    }

    /**
     * Publish postal code
     *
     * @param postal_code
     */
    pushPostalCode(postal_code) {
        let payload = {
            "pc": postal_code
        };
        this.initConnection("postalCode", payload);
    }

    /**
     * Store a meeting to local storage
     *
     * @param meeting
     */
    pushMeeting(meeting){
        let currentMeetings = JSON.parse(localStorage.getItem('meetings'));

        if (currentMeetings === null) {
            console.log('Récupération lors ajout null');
            currentMeetings = [];
        }

        let today = new Date();
        let date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

        let newMeeting = {
            'identifiant': meeting.identifiant,
            'date': date,
            'time': time,
            'min_power': meeting.min_power,
            'max_power': meeting.max_power,
            'description': meeting.description,
            'health': ''
        };
        currentMeetings.push(newMeeting);

        localStorage.setItem('meetings', JSON.stringify(currentMeetings));
    }

    /**
     * Get all meetings stored in local storage
     *
     * @returns {{identifiant: string}[]|any}
     */
    getMeetings() {
        let rencontres = JSON.parse(localStorage.getItem('meetings'));
        if (rencontres !== null) {
            this.getHealth(rencontres);
            return rencontres;
        } else {
            console.log('Récupération null');
            return [{
                identifiant: 'Pas de rencontres disponibles'
            }];
        }
    }

    /**
     * Subscribe to each contact's health
     *
     * @param rencontres
     */
    getHealth(rencontres) {
        const clientId = 'a:' + org + ':' + apiKey;
        client = new paho.Client(org + '.messaging.internetofthings.ibmcloud.com', 8883, clientId);

        client.onConnectionLost = this.onConnectionLost;
        client.onMessageArrived = this.onMessageArrived;

        let topic = '';

        client.connect({
            onSuccess: function () {
                try {
                    for (let i = 0; i < rencontres.length; i++) {
                        topic = "iot-2/type/" + deviceType + "/id/" + rencontres[i].identifiant + "/evt/health/fmt/json";
                        client.subscribe(topic);
                        console.log(topic + ' subscribe');
                    }
                } catch (e) {
                    console.log(e);
                    console.log(topic + ' not subscribe');
                }
            },
            onFailure: function() {console.log('Connection failed')},
            userName: apiKey,
            password: apiToken,
            useSSL: true,
        });
    }
}
export default new CitoyenService();