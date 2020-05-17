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
                                <v-layout mt-2 row justify-center="">
                                    <v-flex xs8 md5 >
                                        <v-btn block @click.stop.prevent="submit('login')">Se connecter</v-btn>
                                    </v-flex>
                                </v-layout>
                            </v-form>
                        </v-flex>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
        <popup-error :error="error" :message_error="message_error" v-on:ranger_alerte="rangerAlerte"></popup-error>
    </v-layout>
</template>

<script>
    import User from '../models/user';
    import {Rules} from "../module/rules";
    import PopupError from "../components/PopupError";
    export default {
        components:{PopupError},
        data(){
          return{
              valid: true,
              rules:new Rules(),
              user:new User('',''),
              show: false,
              show_c: false,
              contain:null,
              error:false,
              message_error:null,
              roles:['Citoyen', 'Médecin']
          }
        },
        methods : {
            rangerAlerte(){
                this.error=false
            },
            swap(page){
                this.contain=page
            },
            submit(page){
                if(page==='login'){
                        this.login();
                }
                if(page==='register'){
                        this.register();
                }
            },
            register(){
                //code register
            },
            login(){
                //code login
            }
        }
    }
</script>
<style>
</style>
