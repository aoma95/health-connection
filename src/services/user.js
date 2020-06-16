import paho from 'paho-mqtt';
import CitoyenBord from "../views/CitoyenBord";
//import MedecinBord from "../views/MedecinBord";

export class UserService {

    constructor(user, api) {
        // Get current user
        this.user = user;

        // Set current api key and token
        this.api = api;

        this.org = 'mbrym4';
        this.deviceType = 'iot-client';
        this.board = null;
        this.appliClient = null;
        this.deviceClient = null;
    }

    /**
     * Init device or/and application clients
     */
    initClients(board) {
        this.board = board;

        // Initialize application client
        const appliClientId = 'a:' + this.org + ':' + this.api.key;
        this.appliClient = new paho.Client(this.org + ".messaging.internetofthings.ibmcloud.com", 8883, appliClientId);

        this.appliClient.onConnectionLost = this.onConnectionLost;
        // Return subscribe message in boards
        this.appliClient.onMessageArrived = this.board.subscribeResult;
        //this.appliClient.onMessageArrived = this.user.role === "citoyen" ? CitoyenBord.methods.subscribeResult : MedecinBord.methods.subscribeResult;

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
        
        let message = new paho.Message(JSON.stringify(payload));
        message.destinationName = newTopic;


        if (client.isConnected()) {

            try {
                client.send(message);
                console.log(newTopic + ' send');
            } catch (e) {
                console.log(e);
                console. log (newTopic + ' not send');
            }
        } else {
            client.connect({
                onSuccess: function () {
                    
                    try {
                        client.send(message);
                        console.log(newTopic + ' send');
                    } catch (e) {
                        console.log(e);
                        console. log (newTopic + ' not send');
                    }
                },
                onFailure: function () {
                    console.log('Connection failed');
                },
                userName: isDevice ? "use-token-auth" : this.api.key,
                password: isDevice ? this.user.password : this.api.token,
                useSSL: true,
            });
        }    
    }

    /**
     * Subscribe a topic
     *
     * @param isDevice  Use application or current device
     * @param users     Users
     * @param topics    Topic to subscribe
     */
    subscribeItem(isDevice, users, topics) {
        const client = isDevice ? this.deviceClient : this.appliClient;

        let topicCompleted = '';

        const deviceType = this.deviceType;

        if (client.isConnected()) {
            for (let i = 0; i < users.length; i++) {
    
                for (let j = 0; j < topics.length; j++) {

                    try {
                        topicCompleted = "iot-2" + (isDevice ? "/evt/"+ topics[j] +"/fmt/json" : "/type/" + deviceType + "/id/" + users[i] + "/evt/" + topics[j] + "/fmt/json");
                        //topicCompleted = "iot-2/type/" + deviceType + "/id/" + users[i] + "/evt/" + topics[j] + "/fmt/json";
                        client.subscribe(topicCompleted);
                        console.log(topicCompleted + ' subscribe');
                    } catch (e) {
                        console.log(e);
                        console.log(topicCompleted + ' not subscribe');
                    }
                }
            }
        } else {
            client.connect({
                onSuccess: function () {
                    for (let i = 0; i < users.length; i++) {
    
                        for (let j = 0; j < topics.length; j++) {
    
                            try {
                                topicCompleted = "iot-2" + (isDevice ? "/evt/"+ topics[j] +"/fmt/json" : "/type/" + deviceType + "/id/" + users[i] + "/evt/" + topics[j] + "/fmt/json");
                                //topicCompleted = "iot-2/type/" + deviceType + "/id/" + users[i] + "/evt/" + topics[j] + "/fmt/json";
                                client.subscribe(topicCompleted);
                                console.log(topicCompleted + ' subscribe');
                            } catch (e) {
                                console.log(e);
                                console.log(topicCompleted + ' not subscribe');
                            }
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
        }

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