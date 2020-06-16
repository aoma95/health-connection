import { UserService } from "./user";

export class MedecinService {

    constructor() {
        // Get identified user
        const user = JSON.parse(sessionStorage.getItem('medecin'));

        const api = {
            key: 'a-mbrym4-5wqfprmqaw',
            token: '?nl*lfM5jdMKDp@1w8'
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
     * Store a patient to local storage
     *
     * @param identifiant
     */
    storePatient(identifiant) {
        let newPatient = {
            'identifiant': identifiant,
            'temperature': null,
            'health': null
        }
        this.service.storeItem(newPatient);
    }

    /**
     * Get all registered patients in local storage
     *
     * @returns {{identifiant: string}[]|any}
     */
    getPatients() {
        let patients = JSON.parse(localStorage.getItem(this.service.user.identifiant));

        if (patients !== null) {
            console.log('sd');
            this.subscribeHealthTemperature(patients);
            return patients;
        } else {
            console.log('Récupération null');
            return [{
                identifiant: 'Pas de patients enregistrés'
            }];
        }
    }

    /**
     * Publish citoyen's health
     *
     * @param identifiant   citoyen id
     * @param status        health
     */
    publishHealth(identifiant, status) {
        let payload = {
            "identifiant" : identifiant,
            "hl": status
        }
        this.service.publishItem(false, "health", payload, identifiant);
    }

    /**
     * Subscribe to each patient's health and temperature
     *
     * @param patients
     */
    subscribeHealthTemperature(patients) {
        let users = [];

        for (let i = 0; i < patients.length; i++) {
            users[i] = patients[i].identifiant;
        }

        this.service.subscribeItem(false, users, ['health', 'temperature']);
    }
}
// export default new MedecinService();