<template>
    <v-layout row justify-center="">
        <v-container fluid>
            <v-layout row justify-space-around="">
                <v-flex xs8 md4>
                    <v-text-field v-model="temperature" label="Temperature" required></v-text-field>
                    <v-btn block @click.stop="submit('temperature')">Envoyer votre température</v-btn>
                </v-flex>
                <v-flex xs8 md4>
                    <v-text-field v-model="postal_code" label="Code postal" required></v-text-field>
                    <v-btn block @click.stop="submit('postal_code')">Envoyer votre code postal</v-btn>
                </v-flex>
            </v-layout>
        </v-container>
    </v-layout>
</template>

<script>
    import MembreService from '../services/membre';
    export default {
        components: {

        },
        data(){
            return {
                temperature: null,
                postal_code: null,
            }
        },
        methods: {
            submit(value) {
                if (value === 'temperature') {
                    console.log('Température : ' + this.temperature);
                    MembreService.pushTemperature(this.temperature);
                }
                if (value === 'postal_code') {
                    console.log('Code postal : ' + this.postal_code)
                }
            }
        }
    }
</script>