<template>
    <v-layout>
        <v-container fluid>
            <v-layout row mb-5 justify-space-around="">
                <v-flex>
                    <h1>Tableau de bord Admin</h1>
                </v-flex>
            </v-layout>

            <v-layout row justify-space-around="">
                <v-flex xs8 md6>
                    <table class="table">
                        <thead>
                        <tr>
                            <th scope="col">Code Postal</th>
                            <th scope="col">Total</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-if="postalCodes.length === 0">
                            <td colspan="2">Aucune donnée disponible</td>
                        </tr>
                        <tr v-else v-for="postalCode in postalCodes" :key="postalCode.identifiant">
                            <td>{{ postalCode.id }}</td>
                            <td>{{ postalCode.citoyens.length }}</td>
                        </tr>
                        </tbody>
                    </table>
                </v-flex>
            </v-layout>
        </v-container>
    </v-layout>
</template>

<script>
    import { AdminService } from "../services/admin";
    export default {
        components: {

        },
        data(){
            return {
                admin: new AdminService(),
                postalCodes: [],
            }
        },
        created:function () {
            this.admin.initClients(this);
            this.admin.subscribePostalCode();
        },
        methods: {
            subscribeResult(message) {
                const data = JSON.parse(message.payloadString);

                let postalCodeExists = false;
                let identifiantExists = false;
                let pcCount = 0;
                let idCount = 0;

                for (let i = 0; i < this.postalCodes.length; i++) {
                    
                    // Check postal code already registered
                    if (this.postalCodes[i].id === data.pc) {
                        postalCodeExists = true;
                        pcCount = i;
                    }

                    for (let j = 0; j < this.postalCodes[i].citoyens.length; j++) {

                        // Check identifiant already registered
                        if (this.postalCodes[i].citoyens[j] === data.identifiant) {
                            identifiantExists = true;
                            pcCount = i;
                            idCount = j;
                        }
                    }
                }

                if (postalCodeExists && identifiantExists) {

                    console.log('Postal code and id already exists');
                } else if (postalCodeExists && !identifiantExists) {
                    
                    // Insert identifiant into existing postal code
                    this.postalCodes[pcCount].citoyens.push(data.identifiant);
                } else {

                    if (!postalCodeExists && identifiantExists) {

                        // Remove id from its last postal code
                        this.postalCodes[pcCount].citoyens.splice(idCount, 1);

                        // Remove postal code if empty citoyens array
                        if (this.postalCodes[pcCount].citoyens.length === 0) {
                            
                            this.postalCodes.splice(pcCount, 1);
                        }
                    }

                    this.postalCodes.push({
                        id: data.pc,
                        citoyens: [
                            data.identifiant,
                        ]
                    })
                }
            }
        }
    }
</script>