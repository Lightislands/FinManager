<template>
  <div>
    <v-dialog v-model="dialog" max-width="500px">
      <v-btn color="blue" dark slot="activator" class="mb-2">New Item1</v-btn>

      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>

        <app-add-record :formEditData="editedItem" :editedItem="editedItem" :dialog="dialog" :defaultItem="defaultItem" :editedIndex="editedIndex" :items="items"></app-add-record>

      </v-card>

    </v-dialog>
    <v-data-table
      :headers="headers"
      :items="items"
      hide-actions
      class="elevation-1"
    >

    <!-- Display data list -->
    <template slot="items" slot-scope="props">

                    <tr @click="props.expanded = !props.expanded" v-if="props.item.type === type"> <!--  v-if="!props.item.planned" -->
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
                        </td>
                        <td>{{ props.item.description }}</td>
                        <td>{{ props.item.categories }}</td>
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

      <template slot="no-data">
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>

    </v-data-table>
  </div>
</template>

<script>
    import AddRecord from './AddRecord.vue';
    import { mapGetters } from 'vuex';

  export default {
      props: ['type'], // Display Expense or Income items

    data: () => ({
      dialog: false,
      headers: [
                    {
                        text: 'Date',
                        align: 'left',
                        sortable: true,
                        value: 'date'
                    },
                    { text: '', value: 'avatar' },
                    { text: 'Name', value: 'name' },
                    { text: 'Description', value: 'description' },
                    { text: 'Categories', value: 'categories' },
                    { text: 'Amount', value: 'amount' },
                    { text: 'Account', value: 'account' }
        ],
      items: [],
      editedIndex: -1,
      editedItem: {
                expInc: true,
                planned: true,
                id: null,
                date: null,
                name: null,
                amount: null,
                description: null,
                account: null,
                accountOptions: [
                    'Cache',
                    'Credit cart',
                    'Cart'
                ],

                currency: null,
                currencyOptions: [
                    '$',
                    '€'
                ],
                e11: [],
                people: [
                    { header: 'Group 1' },
                    { name: 'Sandra Adams' },
                    { name: 'Ali Connors' },
                    { name: 'Trevor Hansen' },
                    { name: 'Tucker Smith' },
                    { divider: true },
                    { header: 'Group 2' },
                    { name: 'Britta Holt' },
                    { name: 'Jane Smith ' },
                    { name: 'John Smith' },
                    { name: 'Sandra Williams' }
                ]
      },
      defaultItem: {
                expInc: true,
                planned: true,
                id: null,
                date: null,
                name: null,
                amount: null,
                description: null,
                account: null,
                accountOptions: [
                    'Cache',
                    'Credit cart',
                    'Cart'
                ],

                currency: null,
                currencyOptions: [
                    '$',
                    '€'
                ],
                e11: [],
                people: [
                    { header: 'Group 1' },
                    { name: 'Sandra Adams' },
                    { name: 'Ali Connors' },
                    { name: 'Trevor Hansen' },
                    { name: 'Tucker Smith' },
                    { divider: true },
                    { header: 'Group 2' },
                    { name: 'Britta Holt' },
                    { name: 'Jane Smith ' },
                    { name: 'John Smith' },
                    { name: 'Sandra Williams' }
                ]   
      }
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.items = this.$store.state.items;
      },

      editItem (item) {
        this.editedIndex = this.items.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        // const index = this.items.indexOf(item)
        // confirm('Are you sure you want to delete this item?') && this.items.splice(index, 1)
      this.$store.commit('deleteRecord', item);
      }
    },
    components: {
        appAddRecord: AddRecord
    }
  }
</script>