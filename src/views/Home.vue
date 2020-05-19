<template>
    <v-layout row justify-center="">
        <v-container fluid>
            <v-container mt-1>
                <v-layout row justify-center="">
                    <v-flex md8 xs10>
                        <p>Lorems from secnaissance. The first line of Lorem Ipsum, "Lore</p>
                    </v-flex>
                </v-layout>
            </v-container>
                <v-layout row justify-space-around="">
                    <v-flex xs8 md4>
                        <v-btn block @click.stop.prevent="swap('register')">Inscription</v-btn>
                    </v-flex>
                    <v-flex xs8 md4>
                        <v-btn block @click.stop.prevent="swap('login')">Connexion</v-btn>
                    </v-flex>
                </v-layout>
        </v-container>
        <v-container v-if="contain==='register'" fluid>
            <h1 class="title"><b>Inscription</b></h1>
            <v-row>
                <v-col cols="12">
                    <v-row align="center" justify="center" >
                        <v-flex xs12 md8 >
                            <v-form ref="register" class="mx-2">
                                <v-layout mt-2 row justify-center="">
                                    <v-flex xs11 md4 >
                                        <v-text-field v-model="user.identifiant" label="Identifiant" required></v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout mt-2 row justify-space-around="">
                                    <v-flex xs11 md3 >
                                        <v-text-field v-model="user.password" :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" @click:append="show = !show" :type="show ? 'text' : 'password'" label="Mot de passe" :rules="this.rules.password()" required></v-text-field>
                                    </v-flex>
                                    <v-flex xs11 md3 >
                                        <v-text-field v-model="user.c_password" :type="show_c ? 'text' : 'password'" label="Retaper le mot de passe" :append-icon="show_c ? 'mdi-eye' : 'mdi-eye-off'" @click:append="show_c = !show_c" :rules="this.rules.cPassword(user.password)" required></v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout mt-2 row justify-center="">
                                    <v-flex xs11 md4>
                                        <v-select v-model="user.role" label="Statut" :items="roles">
                                        </v-select>
                                    </v-flex>
                                </v-layout>
                                <v-layout mt-2 row justify-center="">
                                    <v-flex xs8 md5 >
                                        <v-btn block @click.stop.prevent="submit('register')">S'inscrire</v-btn>
                                    </v-flex>
                                </v-layout>
                            </v-form>
                        </v-flex>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
        <v-container v-if="contain==='login'" fluid>
                <h1 class="title"><b>Connexion</b></h1>
            <v-row>
                <v-col cols="12">
                    <v-row align="center" justify="center" >
                        <v-flex xs12 md8 >
                            <v-form ref="loginUser" class="mx-2">
                                <v-layout mt-2 row justify-center="">
                                    <v-flex xs11 md4 >
                                        <v-text-field v-model="user.identifiant" label="Identifiant" required></v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout mt-2 row justify-center="">
                                    <v-flex xs11 md4 >
                                        <v-text-field v-model="user.password" :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" @click:append="show = !show" :type="show ? 'text' : 'password'" label="Mot de passe" :rules="this.rules.password()" required></v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout mt-2 row justify-space-around="">
                                    <v-flex xs11 md3 >
                                        <v-btn block @click.stop.prevent="submit('loginCitoyen')">Je suis un citoyen</v-btn>
                                    </v-flex>
                                    <v-flex xs11 md3 >
                                        <v-btn block @click.stop.prevent="submit('loginMedecin')">Je suis un médecin</v-btn>
                                    </v-flex>
                                    <v-flex xs11 md3 >
                                        <v-btn block @click.stop.prevent="submit('loginAdmin')">Je suis un admin</v-btn>
                                    </v-flex>
                                </v-layout>
                            </v-form>
                        </v-flex>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
        <popup-error :error="error" :message_error="message_error" v-on:ranger_alerte="rangerAlerte"></popup-error>
        <popup-success :success="success" :message_success="message_success" v-on:ranger_alerte="rangerAlerteSuccess"></popup-success>
    </v-layout>
</template>

<script>
    import User from '../models/user';
    import {Rules} from "../module/rules";
    import PopupError from "../components/PopupError";
    import PopupSuccess from "../components/PopupSuccess";
    import store from "../store";
    export default {
        components:{
            PopupError,
            PopupSuccess
        },
        data(){
          return{
              valid: true,
              rules:new Rules(),
              user:new User('','', '', ''),
              show: false,
              show_c: false,
              contain:null,
              success:false,
              error:false,
              message_error:null,
              message_success:null,
              roles:['Citoyen', 'Médecin']
          }
        },
        methods : {
            rangerAlerte(){
                this.error=false
            },
            rangerAlerteSuccess(){
                this.success = false;
            },
            swap(page){
                this.contain=page
            },
            submit(page){
                if(page==='loginCitoyen'){
                    this.loginCitoyen();
                }
                if(page==='loginMedecin'){
                    this.loginMedecin();
                }
                if(page==='loginAdmin'){
                    this.loginAdmin();
                }
                if(page==='register'){
                    this.register();
                }
            },
            register(){
                store.dispatch('auth/register', this.user).then(
                    resp => {
                        console.log(resp);
                        this.message_success = 'Votre inscription est finalisée. Nous vous invitons à vous connecter !';
                        this.success = true;
                    }).catch(error => {
                        console.log(error);
                        this.message_error = 'Impossible de vous inscrire avec ses informations données';
                        this.error = true;
                });
            },
            loginCitoyen(){
                this.user.role = "citoyen";
                store.dispatch('auth/login', this.user).then(
                    resp => {
                        console.log(resp);
                        // Route tableau bord citoyen
                    }).catch(error => {
                        console.log(error);
                        this.message_error = 'Impossible de vous connecter avec ces identifiants';
                        this.error = true;
                });
            },
            loginMedecin(){
                this.user.role = "medecin";
                store.dispatch('authMedecin/login', this.user).then(
                    resp => {
                        console.log(resp);
                        // Route tableau bord médecin
                    }).catch(error => {
                        console.log(error);
                        this.message_error = 'Impossible de vous connecter avec ces identifiants';
                        this.error = true;
                });
            },
            loginAdmin(){
                this.user.role = "admin";
                store.dispatch('authAdmin/login', this.user).then(
                    resp => {
                        console.log(resp);
                        // Route tableau bord admin
                    }).catch(error => {
                        console.log(error);
                        this.message_error = 'Impossible de vous connecter avec ces identifiants';
                        this.error = true;
                });
            },
        }
    }
</script>
<style>
</style>
