<template>
    <v-layout row justify-center="">
        <v-container fluid>
            <v-layout row justify-space-around="">
                <v-flex xs8 md4>
                    <v-form v-model="isTemperatureFormValid">
                        <v-text-field v-model="temperature" label="Temperature" :rules="this.rules.temperature()" required></v-text-field>
                        <v-btn :disabled="!isTemperatureFormValid" block @click.stop="submit('temperature')">Envoyer votre température</v-btn>
                    </v-form>
                </v-flex>
                <v-flex xs8 md4>
                    <v-form v-model="isFormPCValid">
                        <v-text-field v-model="postal_code" label="Code postal" :rules="this.rules.postalCode()" required></v-text-field>
                        <v-btn :disabled="!isFormPCValid" block @click.stop="submit('postal_code')">Envoyer votre code postal</v-btn>
                    </v-form>
                </v-flex>
            </v-layout>
        </v-container>
    </v-layout>
</template>

<script>
    import { Rules } from "../module/rules";
    import MembreService from '../services/membre';
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
            }
        },
        methods: {
            submit(value) {
                if (value === 'temperature') {
                    MembreService.pushTemperature(this.temperature);
                }
                if (value === 'postal_code') {
                    MembreService.pushPostalCode(this.postal_code);
                }
            }
        }
    }
</script>