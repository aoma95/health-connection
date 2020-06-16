<template>
    <v-layout row justify-center="">
        <v-container fluid>
            <v-layout row mb-5 justify-space-around="">
                <v-flex>
                    <h1>Tableau de bord</h1>
                </v-flex>
            </v-layout>

            <v-divider class="my-5"></v-divider>

            <v-layout row mb-5 justify-space-around="">
                <v-flex>
                    <h2>Mes patients</h2>
                </v-flex>
            </v-layout>

            <v-layout row mt-5 justify-space-around="">
                <v-flex xs-8 md10>
                    <table class="table">
                        <thead>
                        <tr>
                            <th>Identifiant</th>
                            <th>Température</th>
                            <th>Etat de santé</th>
                            <th colspan="3">Mise à jour</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-if="patients[0].identifiant === 'Pas de patients enregistrés'">
                            <td colspan="6">{{ patients[0].identifiant }}</td>
                        </tr>
                        <tr v-else v-for="pat in patients" :key="pat.identifiant">
                            <td>{{ pat.identifiant }}</td>
                            <td>{{ pat.temperature }}</td>
                            <td>{{ pat.health }}</td>
                            <td><v-btn @click.stop="submit('positive', pat.identifiant)">Positif</v-btn></td>
                            <td><v-btn @click.stop="submit('negative', pat.identifiant)">Négatif</v-btn></td>
                            <td><v-btn @click.stop="submit('suspect', pat.identifiant)">Suspect</v-btn></td>
                        </tr>
                        </tbody>
                    </table>
                </v-flex>
            </v-layout>

            <v-divider class="my-5"></v-divider>

            <v-layout row mb-5 justify-space-around="">
                <v-flex>
                    <h2>Nouveau patient</h2>
                </v-flex>
            </v-layout>

            <v-layout row justify-space-around="">
                <v-flex xs8 md3>
                    <v-form>
                        <v-text-field v-model="patient" label="Identifiant" required></v-text-field>
                        <v-btn block @click.stop="submit('patient')">Ajouter un patient</v-btn>
                    </v-form>
                </v-flex>
            </v-layout>
        </v-container>
    </v-layout>
</template>

<script>
    import { Rules } from "../module/rules";
    import { MedecinService } from "../services/medecin";
    export default {
        components: {

        },
        data(){
            return {
                medecin: new MedecinService(),
                rules: new Rules(),
                patients: null,
                patient: null,
            }
        },
        created:function () {
            this.medecin.initClients(this);
            this.patients = this.medecin.getPatients();
        },
        methods: {
            submit(value, id = null) {
                if (value === 'patient' && this.patients !== "") {
                    console.log('new patient');
                    this.medecin.storePatient(this.patient);
                    this.patients = this.medecin.getPatients();
                } else {
                    this.medecin.publishHealth(id, value);
                }
            },
            subscribeResult(message) {
                const data = JSON.parse(message.payloadString)
                const keys = Object.keys(data);

                // Attribute temperature or health to its patient
                for (let i = 0; i < this.patients.length; i++) {

                    if (this.patients[i].identifiant === data.identifiant) {

                        // Set patient's temperature
                        if (keys[1] === 't') {
                            this.patients[i].temperature = data.t;
                        }
                        // Set patient's health
                        if (keys[1] === 'hl') {
                            this.patients[i].health = data.hl;
                        }
                    }
                }
            }
        }
    }
</script>
