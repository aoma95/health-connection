import { UserService } from './user';

export class CitoyenService {

    constructor() {
        // Get identified user
        const user = JSON.parse(sessionStorage.getItem('citoyen'));

        const api = {
            key: 'a-mbrym4-rdf3lojgwv',
            token: '5jq*9Dca6UBOQQhQpG'
        };

        this.service = new UserService(
            user,
            api
        );
    }

    /**
     * Init device or/and application clients
     */
    initClients(board) {
        this.service.initClients(board);
    }

    /**
     * Publish temperature
     *
     * @param temperature
     */
    publishTemperature(temperature) {
        let payload = {
            "identifiant": this.service.user.identifiant,
            "t": temperature
        };
        this.service.publishItem(true, "temperature", payload);
    }

    /**
     * Publish postal code
     *
     * @param postal_code
     */
    publishPostalCode(postal_code) {
        let payload = {
            "identifiant": this.service.user.identifiant,
            "pc": postal_code
        };
        this.service.publishItem(true, "postalCode", payload);
    }

    /**
     * Store a meeting to local storage
     *
     * @param meeting
     */
    storeMeeting(meeting){
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

        this.service.storeItem(newMeeting);
    }

    /**
     * Get all meetings stored in local storage
     *
     * @returns {{identifiant: string}[]|any}
     */
    getMeetings() {
        let rencontres = JSON.parse(localStorage.getItem(this.service.user.identifiant));

        if (rencontres !== null) {
            console.log('sd');
            this.subscribeHealth(rencontres);
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
    subscribeHealth(rencontres) {
        let users = [];

        for (let i = 0; i < rencontres.length; i++) {
            users[i] = rencontres[i].identifiant;
        }

        users.push('antonycastaner');

        this.service.subscribeItem(false, users, ['health']);
    }
}
// export default new CitoyenService();