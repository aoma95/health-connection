import paho from 'paho-mqtt';

const org = 'mbrym4';
const deviceType = 'iot-client';

class MembreService {

    pushTemperature(temperature) {
        const user = JSON.parse(sessionStorage.getItem('user'));
        console.log(user);
        const clientId = 'd:' + org + ':' + deviceType + ':' + user.identifiant;
        const client = new paho.Client(org + '.messaging.internetofthings.ibmcloud.com', 8883, clientId);

        client.onConnectionLost = this.onConnectionLost;
        client.onMessageArrived = this.onMessageArrived;

        client.connect({
            onSuccess: function () {
                let payload = {
                    "t": temperature
                };
                let message = new paho.Message(JSON.stringify(payload));
                message.destinationName = "iot-2/evt/temperature/fmt/json";

                try {
                    client.send(message);
                    console.log('Temperature send');
                } catch (e) {
                    console.log(e);
                    console.log('Temperature not send');
                }
            },
            onFailure: function() {console.log('no')},
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

    pushPostalCode() {

    }
}
export default new MembreService();