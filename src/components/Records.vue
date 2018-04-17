<template>
    <div class="records">

        <h1>Records - {{ type }}</h1>
<p>{{getTestName}}</p>

    <v-card-title>
      <v-spacer></v-spacer>
      <v-text-field
        append-icon="search"
        label="Search"
        single-line
        hide-details
        v-model="search"
      ></v-text-field>
    </v-card-title>

        <v-data-table
          :headers="headers"
          :items="items"
          item-key="id"
          :search="search"
        >
                <template slot="items" slot-scope="props">
                    <tr @click="props.expanded = !props.expanded" v-if="props.item.expInc == type"> <!--  v-if="!props.item.planned" -->
                        <td class="date">
                            {{ props.item.date }}
                        </td>
                        <td class="avatar">
                            <v-btn fab dark small color="red">{{ props.item.avatar }}</v-btn>
                        </td>
                        <td class="name">
                            <v-edit-dialog
                                :return-value.sync="props.item.name"
                                lazy
                            >{{ props.item.name }}
                            <v-text-field
                                slot="input"
                                label="Edit"
                                v-model="props.item.name"
                                single-line
                                counter
                                :rules="[max25chars]"
                            ></v-text-field>
                            </v-edit-dialog>
                            <div class="description">{{ props.item.description }}</div>
                        </td>
                        <td><span v-for="cat in props.item.categories">{{ cat }}<span v-if="props.item.categories.length > 1">&nbsp; </span></span></td>
                        <td>{{ props.item.currency }} {{ props.item.amount }}</td>
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

        <v-dialog v-model="dialogEdit" max-width="500px" @keydown.esc="dialogEdit = false">
            <v-card>
                <v-card-title><span class="headline"> Edit record </span></v-card-title>
                <!--:formEditData - item data, :dialogEdit - modal state -->
                <app-add-record :formEditData="editingItem" :editModal="dialogEditModal"></app-add-record>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>

    import AddRecord from './AddRecord.vue';
    import { mapGetters } from 'vuex';

    export default {

        props: ['type'], // Exp or Income

        data () {
            return {
                dialogEditModal: {isOpen: true},
                dialogEdit: false,

                search: '',
                max25chars: (v) => v.length <= 25 || 'Input too long!',

                headers: [
                    {
                        text: 'Date',
                        align: 'left',
                        sortable: true,
                        value: 'date'
                    },
                    { text: '', value: 'avatar' },
                    { text: 'Name', value: 'name' },
                    // { text: 'Description', value: 'description' },
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
                this.dialogEdit = true;
                this.editingItem = item;
            },
            deleteItem (item) {
                this.$store.commit('deleteRecord', item);
            }
        },

        computed: {
            ...mapGetters([ // Can be used if we need just return result, without sending parameters
//                'getAllRecords',
                'getTestName',
            ]),
            isOpen() {
                return this.dialogEditModal.isOpen;
            }
        },
        watch: {
           isOpen() {
               this.dialogEdit = false;
            },
            dialogEdit(){
                if(!this.dialogEditModal.isOpen){
                    this.dialogEditModal.isOpen = true;
                }
            }
        },
        components: {
            appAddRecord: AddRecord
        }
    }
</script>