import paho from 'paho-mqtt';
import CitoyenBord from "../views/CitoyenBord";
import MedecinBord from "../views/MedecinBord";

class UserService {

    constructor(role, org, appliClientId, deviceClientId, api) {
        // Get current user
        this.user = JSON.parse(sessionStorage.getItem('user'));

        // Set current api key and token
        this.api = api;

        // Initialize application client
        this.appliClient = new paho.Client(org + ".messaging.internetofthings.ibmcloud.com", 8883, appliClientId);

        this.appliClient.onConnectionLost = this.onConnectionLost;
        // Return subscribe message in boards
        this.appliClient.onMessageArrived = role === "citoyen" ? CitoyenBord.methods.subscribeResult : MedecinBord.methods.subscribeResult;

        // Initialize device client
        this.deviceClient = new paho.Client(org + ".messaging.internetofthings.ibmcloud.com", 8883, deviceClientId);

        this.deviceClient.onConnectionLost = this.onConnectionLost;
        // Return subscribe message in boards
        this.deviceClient.onMessageArrived = role === "citoyen" ? CitoyenBord.methods.subscribeResult : MedecinBord.methods.subscribeResult;
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
     */
    publishItem(isDevice, topic, payload) {
        const client = isDevice ? this.deviceClient : this.appliClient;

        client.connect({
            onSuccess: function () {
                let message = new paho.Message(JSON.stringify(payload));
                message.destinationName = topic;

                try {
                    client.send(message);
                    console.log(topic + ' send');
                } catch (e) {
                    console.log(e);
                    console. log (topic + ' not send');
                }
            },
            onFailure: function () {
                console.log('Connection failed');
            },
            username: isDevice ? "use-token-auth" : this.api.key,
            password: isDevice ? this.user.password : this.api.token,
            useSSL: true,
        });
    }

    /**
     * Subscribe a topic
     *
     * @param isDevice  Use application or current device
     * @param topics    List of topics to subscribe
     */
    subscribeItem(isDevice, topics) {
        const client = isDevice ? this.deviceClient : this.appliClient;

        let topic = '';

        client.connect({
            onSuccess: function () {
                for (let i = 0; i < topics.length; i++) {
                    try {
                        topic = topics[i];
                        client.subscribe(topic);
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
            username: isDevice ? "use-token-auth" : this.api.key,
            password: isDevice ? this.user.password : this.api.token,
            useSSL: true,
        });
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