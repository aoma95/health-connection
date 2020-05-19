<template>
    <div class="text-center">
        <v-bottom-sheet v-model="error" persistent>
            <v-sheet class="text-center" height="200px">
                <v-btn
                        large
                        class="mt-6"
                        text
                        color="error"
                        @click="validate"
                >Fermer</v-btn>
                <v-layout mt-2 row justify-center="">
                    <v-flex xs12 md5 >
                        <p v-text="message_error"></p>
                    </v-flex>
                </v-layout>
            </v-sheet>
        </v-bottom-sheet>
    </div>
</template>
<script>
    export default {
        name:'AlerteError',
        props:['error','message_error'],
        methods:{
            validate(){
                this.$emit('ranger_alerte')
            },
        },

    }
</script>
