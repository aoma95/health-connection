<template>
    <v-row justify="center">
        <v-dialog v-model="success" max-width="290" persistent>
            <v-card>
                <v-card-title class="headline">Confirmation</v-card-title>
                <v-card-text>
                    <p v-text="message_success"></p>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="success" text @click="rangerAlerte">
                        OK
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>
<script>
    export default {
        name:'AlerteSuccess',
        props:['success','message_success'],
        methods:{
            rangerAlerte(){
                this.$emit('ranger_alerte')
            },
        },

    }
</script>
