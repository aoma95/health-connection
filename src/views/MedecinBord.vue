<template>
    <v-layout row justify-center="">
        <v-container fluid>
            <v-layout row mb-5 justify-space-around="">
                <v-flex>
                    <h1>Tableau de bord</h1>
                </v-flex>
            </v-layout>
            <v-layout row mb-5 justify-space-around="">
                <v-flex>
                    <h2>Liste patients</h2>
                </v-flex>
            </v-layout>
            <v-layout row mt-5 justify-space-around="">
                <v-flex xs-8 md5>
                    <table class="table">
                        <thead>
                        <tr>
                            <th>Id Patien</th>
                            <th>Température</th>
                            <th>Etat de santé</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                        </tr>
                        <tr>
                            <td></td>
                            <td>dsf</td>
                            <td><v-select></v-select> </td>
                            <td><v-btn>Modifier</v-btn></td>
                        </tr>
                        </tbody>
                    </table>
                </v-flex>
            </v-layout>
        </v-container>
    </v-layout>
</template>

<script>
    import { Rules } from "../module/rules";
    import MedecinService from "../services/medecin";
    export default {
        components: {

        },
        data(){
            return {
                rules: new Rules(),
                rencontres: null,
            }
        },
        created:function () {
            this.rencontres = MedecinService.getHealth();
        },
        methods: {

        }
    }
</script>
