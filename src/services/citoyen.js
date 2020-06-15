import { UserService } from './user';

const org = 'mbrym4';
const apiKey = 'a-mbrym4-rdf3lojgwv';
const apiToken = '5jq*9Dca6UBOQQhQpG';

// Get identified user
const user = JSON.parse(sessionStorage.getItem('user'));

export class CitoyenService extends UserService {

    constructor() {
        const api = {
            key: apiKey,
            token: apiToken
        };
        super(
            user,
            org,
            api
        );
        console.log(this.user);
        console.log(this.org);
        console.log(this.api);
        console.log(this.appliClient);
        console.log(this.deviceClient);
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
        this.publishItem(true, "temperature", payload);
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
        this.publishItem(true, "postalCode", payload);
    }

    /**
     * Store a meeting to local storage
     *
     * @param meeting
     */
    pushMeeting(meeting){
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

        this.storeItem(newMeeting);
    }

    /**
     * Get all meetings stored in local storage
     *
     * @returns {{identifiant: string}[]|any}
     */
    getMeetings() {
        let rencontres = JSON.parse(localStorage.getItem(user.identifiant));

        if (rencontres !== null) {
            console.log('sd');
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
        let users = [];

        for (let i = 0; i < rencontres.length; i++) {
            users[i] = rencontres[i].identifiant;
        }

        this.subscribeItem(false, users, 'health');
    }
}
// export default new CitoyenService();