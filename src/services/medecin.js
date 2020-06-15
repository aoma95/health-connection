import UserService from "./user";

export class MedecinService extends UserService {

    constructor() {
        // Get identified user
        const user = JSON.parse(sessionStorage.getItem('medecin'));

        const api = {
            key: 'a-mbrym4-5wqfprmqaw',
            token: '?nl*lfM5jdMKDp@1w8'
        };

        super(
            user,
            api
        );
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
        this.storeItem(newPatient);
    }

    /**
     * Get all registered patients in local storage
     *
     * @returns {{identifiant: string}[]|any}
     */
    getPatients() {
        let patients = JSON.parse(localStorage.getItem(this.user.identifiant));

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
            "health": status
        }
        this.publishItem(false, "health", payload, identifiant);
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

        this.storeItem(false, users, 'health');
        this.storeItem(false, users, 'temperature');
    }
}
// export default new MedecinService();