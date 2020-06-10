import paho from 'paho-mqtt';
const org = 'mbrym4';
const deviceType = 'iot-client';
const apiKey = 'a-mbrym4-rdf3lojgwv';
const apiToken = '5jq*9Dca6UBOQQhQpG';
let client;
let user;

class MedecinService {

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

    getHealth() {
        const clientId = 'a:' + org + ':' + apiKey;
        client = new paho.Client(org + '.messaging.internetofthings.ibmcloud.com', 8883, clientId);

        client.onConnectionLost = this.onConnectionLost;
        client.onMessageArrived = this.onMessageArrived;

        let topic = '';

        client.connect({
            onSuccess: function () {
                try {
                        topic = "iot-2/type/+/";
                        client.subscribe(topic);
                        console.log(topic + ' subscribe');
                        console.log(client.subscribe(topic))
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
export default new MedecinService();
