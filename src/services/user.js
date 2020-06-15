import paho from 'paho-mqtt';
import CitoyenBord from "../views/CitoyenBord";
import MedecinBord from "../views/MedecinBord";

export class UserService {

    constructor(user, api) {
        // Get current user
        this.user = user;

        // Set current api key and token
        this.api = api;

        this.org = 'mbrym4';
        this.deviceType = 'iot-client';
        this.appliClient = null;
        this.deviceClient = null;
    }

    /**
     * Init device or/and application clients
     */
    initClients() {
        // Initialize application client
        const appliClientId = 'a:' + this.org + ':' + this.api.key;
        this.appliClient = new paho.Client(this.org + ".messaging.internetofthings.ibmcloud.com", 8883, appliClientId);

        this.appliClient.onConnectionLost = this.onConnectionLost;
        // Return subscribe message in boards
        this.appliClient.onMessageArrived = this.user.role === "citoyen" ? CitoyenBord.methods.subscribeResult : MedecinBord.methods.subscribeResult;

        if (this.user.role === "citoyen") {
            const deviceClientId = 'd:' + this.org + ':' + this.deviceType + ':' + this.user.identifiant;
            // Initialize device client
            this.deviceClient = new paho.Client(this.org + ".messaging.internetofthings.ibmcloud.com", 8883, deviceClientId);

            this.deviceClient.onConnectionLost = this.onConnectionLost;
            // Return subscribe message in boards
            this.deviceClient.onMessageArrived = CitoyenBord.methods.subscribeResult;
        }
    }

    /**
     * Client loses connection to broker
     *
     * @param responseObject
     */
    onConnectionLost(responseObject) {
        if (responseObject.errorCode !== 0) {
            console.log("onConnectionLost:" + responseObject.errorMessage);
        }
    }

    /**
     * Publish a topic
     *
     * @param isDevice  Use application or current device
     * @param topic     Topic to publish
     * @param payload   Data to publish
     * @param identifiant   Citoyen identifiant
     */
    publishItem(isDevice, topic, payload, identifiant = null) {
        const client = isDevice ? this.deviceClient : this.appliClient;
        const newTopic = "iot-2" + (isDevice ? "/evt/"+ topic +"/fmt/json" : "/type/" + this.deviceType + "/id/" + identifiant + "/evt/" + topic + "/fmt/json");

        client.connect({
            onSuccess: function () {
                let message = new paho.Message(JSON.stringify(payload));
                message.destinationName = newTopic;

                try {
                    client.send(message);
                    console.log(topic + ' send');
                } catch (e) {
                    console.log(e);
                    console. log (topic + ' not send');
                }
                client.disconnect();
            },
            onFailure: function () {
                console.log('Connection failed');
            },
            userName: isDevice ? "use-token-auth" : this.api.key,
            password: isDevice ? this.user.password : this.api.token,
            useSSL: true,
        });
    }

    /**
     * Subscribe a topic
     *
     * @param isDevice  Use application or current device
     * @param users     Users
     * @param topic    Topic to subscribe
     */
    subscribeItem(isDevice, users, topic) {
        const client = isDevice ? this.deviceClient : this.appliClient;

        let topicCompleted = '';

        client.connect({
            onSuccess: function () {
                for (let i = 0; i < users.length; i++) {
                    try {
                        topicCompleted = "iot-2/type/" + this.deviceType + "/id/" + users[i].identifiant + "/evt/" + topic + "/fmt/json";
                        client.subscribe(topicCompleted);
                        console.log(topic + ' subscribe');
                    } catch (e) {
                        console.log(e);
                        console.log(topic + ' not subscribe');
                    }
                }
            },
            onFailure: function () {
                console.log('Connection failed');
            },
            userName: isDevice ? "use-token-auth" : this.api.key,
            password: isDevice ? this.user.password : this.api.token,
            useSSL: true,
        });

        // Plus tard (peut-être ;) ) reconnect: true,
    }

    /**
     * Store a item like meetings or patients in local storage
     *
     * @param item  Meeting or patient
     */
    storeItem(item) {
        let currentItems = JSON.parse(localStorage.getItem(this.user.identifiant));

        if (currentItems === null) {
            console.log('Récupération null lors de l\'ajout');
            currentItems = [];
        }

        currentItems.push(item);

        localStorage.setItem(this.user.identifiant, JSON.stringify(currentItems));
    }
}
export default new UserService();