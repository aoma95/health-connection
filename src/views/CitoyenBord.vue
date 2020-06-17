<template>
    <v-layout row justify-center="">
        <v-container fluid>
            <v-layout row justify-space-around="" class="mb-5">
                <v-flex>
                    <h1>Tableau de bord Citoyen</h1>
                </v-flex>
            </v-layout>

            <v-divider class="my-5"></v-divider>

            <v-layout row justify-space-around="" class="mb-5">
                <v-flex>
                    <h2>Mes données personnelles</h2>
                </v-flex>        
            </v-layout>


            <v-layout row justify-space-around="">
                <v-flex xs8 md6>
                    <table class="table">
                        <thead>
                        <tr>
                            <th scope="col">Température</th>
                            <th scope="col">Etat de santé</th>
                            <th scope="col">Code postal</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>{{ myTemp }}</td>
                            <td>{{ myHealth }}</td>
                            <td>{{ myCP }}</td>
                        </tr>
                        </tbody>
                    </table>
                </v-flex>
            </v-layout>

            <v-divider class="my-5"></v-divider>

            <v-layout row justify-space-around="" class="mb-5">
                <v-flex>
                    <h2>Mises à jour</h2>
                </v-flex>
            </v-layout>

            <v-layout row justify-space-around="">
                <v-flex xs8 md3>
                    <v-form v-model="isTemperatureFormValid">
                        <v-text-field v-model="temperature" label="Temperature" :rules="this.rules.temperature()" required></v-text-field>
                        <v-btn :disabled="!isTemperatureFormValid" block @click.stop="submit('temperature')">Envoyer votre température</v-btn>
                    </v-form>
                </v-flex>
                <v-flex xs8 md1>
                    <v-label>GPS</v-label>
                    <v-btn block @click.stop="updateGPS()">{{ isGPS ? "Désactiver" : "Activer" }}</v-btn>
                </v-flex>
                <v-flex xs8 md3>
                    <v-form v-model="isFormPCValid">
                        <v-text-field v-model="postal_code" label="Code postal" :rules="this.rules.postalCode()" required></v-text-field>
                        <v-btn :disabled="!isFormPCValid" block @click.stop="submit('postal_code')">Envoyer votre code postal</v-btn>
                    </v-form>
                </v-flex>
            </v-layout>

            <v-divider class="my-5"></v-divider>

            <v-layout row justify-space-around="" class="mb-5">
                <v-flex>
                    <h2>Rencontres</h2>
                </v-flex>
            </v-layout>

            <v-layout row justify-space-around="" class="mt-5">
                <v-flex xs-8 md10>
                    <table class="table">
                        <thead>
                        <tr>
                            <th scope="col">Identifiant</th>
                            <th scope="col">Date</th>
                            <th scope="col">Heure</th>
                            <th scope="col">Puissance Min</th>
                            <th scope="col">Puissance Max</th>
                            <th scope="col">Description</th>
                            <th scope="col">Etat de santé</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-if="rencontres[0].identifiant === 'Pas de rencontres disponibles'">
                            <td colspan="7">{{ rencontres[0].identifiant }}</td>
                        </tr>
                        <tr v-else v-for="rencontre in rencontres" :key="rencontre.identifiant">
                            <td>{{ rencontre.identifiant }}</td>
                            <td>{{ rencontre.date }}</td>
                            <td>{{ rencontre.time }}</td>
                            <td>{{ rencontre.min_power }}</td>
                            <td>{{ rencontre.max_power }}</td>
                            <td>{{ rencontre.description }}</td>
                            <td v-if="rencontre.health !== ''">{{ rencontre.health }}</td>
                            <td v-else>Non communiqué</td>
                        </tr>
                        </tbody>
                    </table>
                </v-flex>
                <v-flex xs-8 md10>
                    <v-form v-model="isRencontreFormValid">
                        <v-layout row wrap justify-space-around="">
                            <v-flex mt-2 md3>
                                <v-text-field v-model="meeting.identifiant" label="Identifiant" :rules="[v => !!v || 'Identifiant Obligatoire']" required></v-text-field>
                            </v-flex>
                            <v-flex mt-2 md3>
                                <v-text-field v-model="meeting.min_power" label="Puissance Min" :rules="this.rules.minPower(this.meeting.max_power)" required></v-text-field>
                            </v-flex>
                            <v-flex mt-2 md3>
                                <v-text-field v-model="meeting.max_power" label="Puissance Max" :rules="this.rules.maxPower(this.meeting.min_power)" required></v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout row wrap justify-space-around="">
                            <v-flex mt-2 md10>
                                <v-text-field v-model="meeting.description" label="Description" :rules="[v => !!v || 'Description Obligatoire']" required></v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout row wrap justify-space-around="">
                            <v-flex mt-2 md10>
                                <v-btn :disabled="!isRencontreFormValid" block @click.stop="submit('meeting')">Envoyer une nouvelle rencontre</v-btn>
                            </v-flex>
                        </v-layout>
                    </v-form>
                </v-flex>
            </v-layout>
        </v-container>
    </v-layout>
</template>

<script>
    import { Rules } from "../module/rules";
    import { CitoyenService } from '../services/citoyen';
    import Meeting from "../models/meeting";
    export default {
        components: {

        },
        data(){
            return {
                citoyen: new CitoyenService(),
                rules: new Rules(),
                temperature: null,
                postal_code: null,
                isTemperatureFormValid: false,
                isFormPCValid: false,
                isRencontreFormValid: false,
                isGPS: false,
                rencontres: null,
                meeting: new Meeting('', '', '', '', '', ''),
                myTemp: null,
                myHealth: null,
                myCP: null,
            }
        },
        created:function () {
            this.citoyen.initClients(this);
            //this.citoyen.subscribePersonalAttributes();
            this.rencontres = this.citoyen.getMeetings();
        },
        methods: {
            submit(value) {
                if (value === 'temperature') {
                    this.myTemp = this.temperature;
                    this.citoyen.publishTemperature(this.temperature);
                }
                if (value === 'postal_code') {
                    this.myCP = this.postal_code;
                    this.citoyen.publishPostalCode(this.postal_code);
                }
                if (value === 'meeting') {
                    this.citoyen.storeMeeting(this.meeting);
                    // Refresh meetings
                    this.rencontres = this.citoyen.getMeetings();
                }
            },
            updateGPS() {
                this.isGPS = ! this.isGPS;

                if (this.isGPS) {
                    navigator.geolocation.getCurrentPosition(function (position) {
                        console.log("Latitude : " + position.coords.latitude);
                        console.log("Longitude : " + position.coords.longitude);
                    });
                }
            },
            subscribeResult(message) {
                const data = JSON.parse(message.payloadString);
                
                let assign = false;

                // Attribute health to its citoyen
                for (let i = 0; i < this.rencontres.length; i++) {

                    if (this.rencontres[i].identifiant === data.identifiant) {
                        this.rencontres[i].health = data.hl;
                        
                        if (data.hl === "positive") {
                            this.myHealth = "suspect";
                        }
                        
                        assign = true;
                    }
                }

                // Attribute health to connected user
                if (! assign) {
                    console.log(data);
                    this.myHealth = data.hl;
                }
            }
        }
    }
</script>