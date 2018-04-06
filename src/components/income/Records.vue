<template>
    <div>
        <h1>Income</h1>
<p>{{getTestName}}</p>
            <v-data-table
                    :headers="headers"
                    :items="items"


            >
                <template slot="items" slot-scope="props">
                    <tr @click="props.expanded = !props.expanded">
                        <td>
                            <v-edit-dialog
                                :return-value.sync="props.item.name"
                                lazy
                            >{{ props.item.date }}
                            <v-text-field
                                slot="input"
                                label="Edit"
                                v-model="props.item.name"
                                single-line
                                counter
                                :rules="[max25chars]"
                            ></v-text-field>
                            </v-edit-dialog>
                        </td>
                        <td>{{ props.item.avatar }}</td>
                        <td>{{ props.item.name }}</td>
                        <td>{{ props.item.categories }}</td>
                        <td>{{ props.item.amount }}</td>
                        <td class="text-xs-right">{{ props.item.account }}</td>
                    </tr>
                </template>

                <template slot="expand" slot-scope="props">
                    <v-card flat>
                        <td class="justify-center layout px-0">
                            <v-btn icon class="mx-5" @click="editItem(props.item)">
                                <v-icon color="teal">edit</v-icon>
                            </v-btn>
                            <v-btn icon class="mx-5" @click="deleteItem(props.item)">
                                <v-icon color="pink">delete</v-icon>
                            </v-btn>
                        </td>
                    </v-card>
                </template>

            </v-data-table>


        <v-dialog v-model="dialog" max-width="500px">
            <v-card>
                <v-card-title>
                    <span class="headline"> Edit record </span>
                </v-card-title>

                <app-add-record :formEditData="editingItem" :isEdit="dialog"></app-add-record>


            </v-card>
        </v-dialog>


    </div>
</template>
<script>

    import AddRecord from '../AddRecord.vue';
    import { mapGetters } from 'vuex';

    export default {
        data () {

            return {
                max25chars: (v) => v.length <= 25 || 'Input too long!',
                pagination: {},


                dialog: false,

                headers: [
                    {
                        text: 'Date',
                        align: 'left',
                        sortable: true,
                        value: 'date'
                    },
                    { text: 'Avatar', value: 'avatar' },
                    { text: 'Name', value: 'name' },
                    { text: 'Categories', value: 'categories' },
                    { text: 'Amount', value: 'amount' },
                    { text: 'Account', value: 'account' }
                ],
                items: this.$store.state.items,

                editingItem: {}

            }
        },

        methods: {
            editItem (item) {
//                this.editedIndex = this.items.indexOf(item)
//                this.editedItem = Object.assign({}, item)
                this.dialog = true;
                this.editingItem = item;
            },
            deleteItem (item) {
                this.$store.commit('deleteRecord', item);
            }
        },

        computed: {
            ...mapGetters([
//                'getAllRecords',
                'getTestName'
            ])
        },

        components: {
            appAddRecord: AddRecord
        }
    }
</script>