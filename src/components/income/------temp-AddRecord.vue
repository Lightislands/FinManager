<template>
    <div class="col-sm-12">
        <div class="panel panel-success">
            <div class="panel-body">

                <div v-if="isEdit">
                    <div>
                        <input type="text" class="form-control" v-model="formEditData.date">
                    </div>
                    <div>
                        <input type="text" class="form-control" v-model="formEditData.name"><!-- :placeholder="formEditData.name" --> <!-- :value="formEditData.name" v-bind="name" -->
                    </div>
                    <div>
                        <input type="text" class="form-control" v-model="formEditData.categories">
                    </div>
                    <div>
                        <input type="number" class="form-control" v-model="formEditData.amount">
                    </div>
                    <div>
                        <input type="text" class="form-control" v-model="formEditData.account">
                    </div>
                    <div class="pull-right">
                        <button class="btn btn-success" @click="addRecord" :disabled="quantity <=0">Add</button>
                    </div>
                </div>

                <div v-else>
                    <!-- <div :class="{warning: nameNotValid}">
                        <input id="newItemName" type="text" class="form-control" placeholder="Name" v-model="name">
                    </div>
                    <div>
                        <input type="text" class="form-control" placeholder="Categories" v-model="categories">
                    </div>
                    <div :class="{warning: amountNotValid}">
                        <input id="newItemAmount" type="number" class="form-control" placeholder="Amount" v-model="amount">
                    </div>
                    <div>
                        <input type="text" class="form-control" placeholder="Account" v-model="account">
                    </div>
                    <div class="pull-right">
                        <button class="btn btn-success" @click.prevent="addRecord" :disabled="quantity <=0">Add</button>
                    </div>
 -->
<v-container fluid>

<v-form v-model="valid" ref="form" lazy-validation>

<v-layout row wrap>
    <v-flex xs4>
        <div id="on" @click="switched(true)" :class="{active: expInc}">Expense</div>
    </v-flex>
    <v-flex xs4>
        <div id="off" @click="switched(false)" :class="{active: !expInc}">Income</div>
    </v-flex>
    <v-flex xs3 offset-xs1>
        <v-switch color="light-blue darken-1" :label="`${planned == true ? 'planned' : 'normal'}`" v-model="planned"></v-switch>
    </v-flex> 
</v-layout>

<v-text-field label="Name" v-model="name" :rules="nameRules" :counter="10" required></v-text-field>

<v-select label="account" v-model="account" :items="accountOptions"></v-select>

<v-layout row wrap>
    <v-flex xs9>
        <v-text-field label="Amount" v-model="amount" required></v-text-field>
    </v-flex>
    <v-flex xs2 offset-xs1>
        <v-select label="currency" v-model="currency" :items="currencyOptions"></v-select>
    </v-flex> 
</v-layout>

    <!-- Categories --> 
<v-select label="Select" :items="people" v-model="e11" item-text="name" item-value="name" multiple chips max-height="auto" autocomplete>
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

    <v-text-field name="input-1" label="Description" v-model="description"></v-text-field>

        
    <v-btn
      @click.prevent="addRecord"
      :disabled="!valid"
    >
      Submit
    </v-btn>
    <v-btn @click="clear">Clear</v-btn>
  </v-form>
   </v-container>             </div>


                <br /> <br /> <hr />

            </div>
        </div>
    </div>
</template>

<script>
//    import { mapMutations } from 'vuex';
import Helper from '../helpers/helper.js';

    export default {

        props: ['formEditData', 'isEdit'], // Get props from records when Edit mode

//        methods: {
//                ...mapMutations([
//                    'addRecord'
//                ])
//        },
        data(){
            return {
                valid: true,

                expInc: true,

                planned: true,

                nameRules: [
                    v => !!v || 'Name is required',
                    v => (v && v.length <= 10) || 'Name must be less than 10 characters'
                ],

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

            // Categories
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
                // nameNotValid: false,
                // amountNotValid: false
            }
        },
        methods: {

            switched(isOn) {
                this.expInc = isOn;
            },

            validate() {
// Set Default values
                    if(this.categories === null){
                        this.categories = "Uncategorized";
                        return true;
                    }
                    if(this.account === null){
                        this.account = "Cache";
                        return true;
                    }

                    
                    // Check if !empty
                    // this.nameNotValid = false;
                    // this.amountNotValid = false;
                    // if(!this.name) {
                    //     this.nameNotValid = true;
                    // } else if(!this.amount) {
                    //     this.amountNotValid = true;
                   //}
                    else {
                        return true;
                    }
            },

            addRecord() {

                if (this.isEdit) {                              // If "Edit" Mode

                    // 1. Check if input value !empty
                    if(this.date === null){
                        this.date = this.formEditData.date;
                    }
                    if(this.name === null){
                        this.name = this.formEditData.name;
                    }
                    if(this.categories === null){
                        this.categories = this.formEditData.categories;
                    }
                    if(this.amount === null){
                        this.amount = this.formEditData.amount;
                    }
                    if(this.account === null){
                        this.account = this.formEditData.account;
                    }


                    let updatedData = {
                        id: this.formEditData.id, // leave old id and date
                        name: this.name,
                        amount: this.amount,
                        categories: this.categories,
                        account: this.account
                    };

                    this.$store.commit('editRecord', updatedData);



                } else {                                        // If "Create New" Mode

                    if (this.validate()) {
                        this.$store.commit('addRecord', {
                            id: Date.now(),
                            date: Helper.today(),
                            avatar: "def",
                            type: this.expInc ? 'expense' : 'income',
                            planned: this.planned,
                            name: this.name,
                            amount: this.amount,
                            currency: this.currency,
                            categories: this.categories,
                            account: this.account
                            }
                        );
                    } 
                    console.log(this.$store.state.items);  
                }



            },
            
            clear () {
                this.$refs.form.reset()
            }
        },
        watch: {
            amount: function() {
// Prevent ">0" value
                this.amount = this.amount < 0 ? this.amount = 0 : this.amount;
// Prevent "0" on start
                this.amount = this.amount.startsWith(0) ? this.amount.substring(1) : this.amount;

            }
        }

    }
</script>

