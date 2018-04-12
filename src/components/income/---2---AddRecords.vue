<template>
    <div>
                <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                    <v-flex xs12 sm6 md4>
                        <v-text-field label="name" v-model="formEditData.name"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                        <v-text-field label="amount" v-model="formEditData.amount"></v-text-field>
                    </v-flex>
                    </v-layout>
                </v-container>
                </v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
                <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
                </v-card-actions>
    </div>
</template>

<script>

    import Helper from '../helpers/helper.js';

    export default {

        props: ['formEditData','editedItem','dialog','defaultItem','items','editedIndex'], 


        // data(){
        //     return {

        //     }
        // }

        methods: {
            close () {
                this.dialog = false
                setTimeout(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
                }, 300)
            },

            save () {
                if (this.editedIndex > -1) {
                Object.assign(this.items[this.editedIndex], this.editedItem)
                } else {
                this.items.push(this.editedItem)
                }
                this.close()
            }
        }
    }
</script>

