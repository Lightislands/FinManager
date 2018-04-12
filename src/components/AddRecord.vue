<template>
    <div class="col-sm-12">
        <div class="panel panel-success">
            <div class="panel-body">

<v-container fluid>

    <v-form v-model="valid" ref="form" lazy-validation>

    <v-layout row wrap>
        <v-flex xs4>
            <div id="on" @click="item.expInc = true" :class="{active: item.expInc}">Expense</div>
        </v-flex>
        <v-flex xs4>
            <div id="off" @click="item.expInc = false" :class="{active: !item.expInc}">Income</div>
        </v-flex>
        <v-flex xs3 offset-xs1>
            <v-switch color="light-blue darken-1" :label="`${item.planned == true ? 'planned' : 'normal'}`" v-model="item.planned"></v-switch>
        </v-flex> 
    </v-layout>

    <v-text-field label="Name" v-model="item.name" :rules="nameRules" :counter="10" required></v-text-field>

    <v-select label="account" v-model="item.account" :items="item.accountOptions"></v-select>

    <v-layout row wrap>
        <v-flex xs9>
            <v-text-field label="Amount" v-model="item.amount" required></v-text-field>
        </v-flex>
        <v-flex xs2 offset-xs1>
            <v-select label="currency" v-model="item.currency" :items="item.currencyOptions"></v-select>
        </v-flex> 
    </v-layout>

        <!-- Categories --> 
    <v-select label="Categories" :items="item.people" v-model="item.categories" item-text="name" item-value="name" multiple chips max-height="auto" autocomplete>
        <template slot="selection" slot-scope="data">
            <v-chip close @input="data.parent.selectItem(data.item)" :selected="data.selected" class="chip--select-multi" :key="JSON.stringify(data.item)">
                {{ data.item.name }}
            </v-chip>
        </template>

        <template slot="item" slot-scope="data">
                <template v-if="typeof data.item !== 'object'">
                    <v-list-tile-content v-text="data.item"></v-list-tile-content>
                </template>
                <template v-else>
                    <v-list-tile-content>
                        <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                    </v-list-tile-content>
                </template>
        </template>
    </v-select>
        <!-- End categories -->  

    <v-text-field name="description" label="Description" v-model="item.description"></v-text-field>

        
    <v-btn
      @click.prevent="addRecord"
      :disabled="!valid"
    >
      Submit
    </v-btn>
    <v-btn @click="clear">Clear</v-btn>
  </v-form>
   </v-container>
                </div>


                <br /> <br /> <hr />

            </div>
        </div>

</template>

<script>
//    import { mapMutations } from 'vuex';
import Helper from '../helpers/helper.js';

    export default {
        // formEditData - data of editing item
        props: ['formEditData', 'dialogNew', 'dialogEdit'], // Get props from records when Edit mode

//        methods: {
//                ...mapMutations([
//                    'addRecord'
//                ])
//        },
        data(){
            return {
                item: {
                    expInc: true,
                    planned: false,
                    id: null,
                    date: null,
                    avatar: null,
                    name: null,
                    description: null,
                    amount: null,
                    account: 'Cache',
                    accountOptions: [
                        'Cache',
                        'Credit cart',
                        'Cart'
                    ],
                    currency: '€',
                    currencyOptions: [
                        '$',
                        '€'
                    ],
                    // Categories
                    categories: ['Uncategorised'],
                    people: [
                        { header: 'Group 1' },
                        { name: 'Uncategorised' },
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

                valid: true
            }
        },
        methods: {

            // validate() {
            //     if(this.categories === null){
            //         this.categories = "Uncategorized";
            //     }
            //     if(this.account === null){
            //         this.account = "Cache";
            //     }
            // },

            addRecord() {
                //this.validate();
                if (this.dialogEdit){
                    // Update
                    this.$store.commit('editRecord', this.item);
                    // setTimeout(() => {
                    // this.dialogEdit = false;
                    // }, 1000)

                }else {
                    // Add new
                    this.item.id = Date.now();
                    this.item.date = Helper.today();
                    this.item.avatar = "def"
                    //type: this.expInc ? 'expense' : 'income';

                    this.$store.commit('addRecord', this.item);
                    //this.dialogNew = false;
                }
                console.log(this.$store.state.items);  
            },
            
            clear () {
                this.$refs.form.reset()
            }
        },
        watch: {
            // if props coming - fill up modal by item data
            formEditData: function(){
                this.item = Object.assign(this.item, this.formEditData);
            },

            // dialogNew: function(){
            //     if(this.dialogNew){
            //         console.log("Click Add New");
            //         // this.item.account === null ? this.item.account = "Cache" : this.item.account;
            //     }
            // },
            amount: function() {
// Prevent ">0" value
                this.item.amount = this.item.amount < 0 ? this.item.amount = 0 : this.item.amount;
// Prevent "0" on start
                this.item.amount = this.item.amount.startsWith(0) ? this.item.amount.substring(1) : this.item.amount;

            }
        }

    }
</script>

