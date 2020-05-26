import paho from 'paho-mqtt';

const org = 'mbrym4';
const deviceType = 'iot-client';
let client;
let user;

class CitoyenService {

    initConnection(topic, payload) {
        // Get connected user
        user = JSON.parse(sessionStorage.getItem('user'));
        const clientId = 'd:' + org + ':' + deviceType + ':' + user.identifiant;
        client = new paho.Client(org + '.messaging.internetofthings.ibmcloud.com', 8883, clientId);

        client.onConnectionLost = this.onConnectionLost;
        client.onMessageArrived = this.onMessageArrived;

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

    onConnectionLost(responseObject) {
        if (responseObject.errorCode !== 0) {
            console.log("onConnectionLost:" + responseObject.errorMessage);
        }
    }

    onMessageArrived(message) {
        console.log("onMessageArrived:" + message.payloadString);
    }

    pushTemperature(temperature) {
        let payload = {
            "t": temperature
        };
        this.initConnection("temperature", payload);
    }

    pushPostalCode(postal_code) {
        let payload = {
            "pc": postal_code
        };
        this.initConnection("postalCode", payload);
    }

    pushMeeting(meeting){
        let currentMeetings = JSON.parse(localStorage.getItem('meetings'));

        if (currentMeetings === null) {
            console.log('Récupération lors ajout null');
            currentMeetings = [];
        }

        let today = new Date();
        let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

        let newMeeting = {
            'identifiant': meeting.identifiant,
            'date': date,
            'time': time,
            'min_power': meeting.min_power,
            'max_power': meeting.max_power,
            'description': meeting.description,
        };
        currentMeetings.push(newMeeting);

        localStorage.setItem('meetings', JSON.stringify(currentMeetings));
    }

    getMeetings() {
        let rencontres = JSON.parse(localStorage.getItem('meetings'));
        if (rencontres !== null) {
            return rencontres;
        } else {
            console.log('Récupération null');
            return [{
                identifiant: 'Pas de rencontres disponibles'
            }];
        }
    }
}
export default new CitoyenService();