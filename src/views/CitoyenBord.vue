<template>
    <v-layout row justify-center="">
        <v-container fluid>
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

            <v-layout row justify-space-around="" class="mt-5">
                <v-flex xs-8 md5>
                    <table>
                        <thead>
                        <tr>
                            <th>Identifiant</th>
                            <th>Date</th>
                            <th>Heure</th>
                            <th>Puissance Min</th>
                            <th>Puissance Max</th>
                            <th>Description</th>
                            <th>Etat de santé</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="rencontre in rencontres" :key="rencontre.identifiant">
                            <td v-if="rencontre.identifiant === 'Pas de rencontres disponibles'" colspan="7">{{ rencontre.identifiant }}</td>
                        </tr>
                        </tbody>
                    </table>
                </v-flex>
                <v-flex xs-8 md5>
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
    import CitoyenService from '../services/citoyen';
    import Meeting from "../models/meeting";
    export default {
        components: {

        },
        data(){
            return {
                rules: new Rules(),
                temperature: null,
                postal_code: null,
                isTemperatureFormValid: false,
                isFormPCValid: false,
                isRencontreFormValid: false,
                isGPS: false,
                rencontres: null,
                meeting: new Meeting('', '', '', '', '', ''),
            }
        },
        created:function () {
            this.rencontres = CitoyenService.getRencontres();
        },
        methods: {
            submit(value) {
                if (value === 'temperature') {
                    CitoyenService.pushTemperature(this.temperature);
                }
                if (value === 'postal_code') {
                    CitoyenService.pushPostalCode(this.postal_code);
                }
                if (value === 'meeting') {
                    console.log(this.meeting);
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
            }
        }
    }
</script>