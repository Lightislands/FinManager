<template>
    <div class="col-sm-12">
        <div class="panel panel-success">
            <div class="panel-body">

<v-container fluid>
    <v-form v-model="valid" ref="form" lazy-validation>
{{getAccounts}}
    <v-layout row wrap>
        <v-flex xs4>
            <div class="exp-inc" @click="item.expInc = true" :class="{active: item.expInc}">
                <i class="material-icons">remove_circle</i>Expense</div>
        </v-flex>
        <v-flex xs4>
            <div class="exp-inc" @click="item.expInc = false" :class="{active: !item.expInc}">
                <i class="material-icons">add_circle</i>Income</div>
        </v-flex>
        <v-flex xs3 offset-xs1>
            <v-switch :label="`${item.planned == true ? 'planned' : 'normal'}`" v-model="item.planned"></v-switch>
        </v-flex> 
    </v-layout>

    <v-layout row wrap>
        <v-flex xs7>
            <v-text-field label="Name"
            v-model="item.name"
            :rules="[
                    () => !!item.name && item.name.length <= 30 || 'Name must be less than 30 characters'
                    ]"
            
            :counter="30"
            ></v-text-field>
        </v-flex>
        <v-flex xs4 offset-xs1>
            <v-menu
                class="datapicker"
                ref="menu"
                lazy
                :close-on-content-click="false"
                v-model="menu"
                transition="scale-transition"
                offset-y
                full-width
                :nudge-right="40"
                min-width="290px"
                :return-value.sync="date"
                show-current: true
            >
                <v-text-field
                slot="activator"
                v-model="item.date"
                prepend-icon="event"
                readonly
                ></v-text-field>

                <v-date-picker v-model="date" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                </v-date-picker>
            </v-menu>

        </v-flex>
    </v-layout>

    <v-layout row wrap>
        <v-flex xs9>
            <v-text-field type="number" label="Amount" v-model="item.amount"
            :rules="[
                    () => !!item.amount > 0 || 'Must be > 0',
                    amountCheck()
                    ]"
            required
            ></v-text-field>
        </v-flex>
        <v-flex xs2 offset-xs1>
            <v-select v-model="item.currency" :items="currencyOptions"></v-select>
        </v-flex> 
    </v-layout>

    <v-select label="account" v-model="item.account" :items="accountOptions"></v-select>


        <!-- Categories --> 
    <v-select label="Categories" :items="categoriesOptions" v-model="item.categories" item-text="name" item-value="name" multiple chips max-height="auto" autocomplete
           :rules="[
              () => !!item.categories && item.categories.length > 0 || 'This field is required'
            ]"
    >
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

    <v-text-field name="description" label="Description" v-model="item.description"
           :rules="[
              () => item.description.length <= 60 || 'Description must be less than 60 characters'
            ]"
            :counter = 60
    ></v-text-field>

    <div class="btn-group">    
        <v-btn
            class="btn-submit"
            @click.prevent="saveRecord"
            :disabled="!isValid"
        >
        <i class="material-icons">check</i>
        Submit
        </v-btn>
        <v-btn class="btn-clear" @click.prevent="clear">Clear</v-btn>
    </div>
  </v-form>
   </v-container>
                </div>
            </div>
        </div>

</template>

<script>
//    import { mapMutations } from 'vuex';
import Helper from '../helpers/helper.js';

    export default {
        // formEditData - data of editing item
        props: ['formEditData', 'newModal', 'editModal'], // Get props from records when Edit mode

//        methods: {
//                ...mapMutations([
//                    'addRecord'
//                ])
//        },
        data(){
            return {
                menu: false,
                modal: false,
                date: null, // To detect by watch
                datestring:'', // Converted date

                accountOptions: this.$store.state.accountOptions,
                currencyOptions: this.$store.state.currencyOptions,
                categoriesOptions: this.$store.state.categoriesOptions,

                item: {
                    expInc: true,
                    planned: false,
                    id: null,
                    date: Helper.today(),
                    avatar: null,
                    name: "",
                    description: "",
                    amount: null,
                    account: 'Cache',
                    currency: '€',
                    categories: ['Uncategorised']
                },

                defaultItem: {
                    expInc: true,
                    planned: false,
                    id: null,
                    date: Helper.today(),
                    avatar: null,
                    name: "",
                    description: "",
                    amount: null,
                    account: 'Cache',
                    currency: '€',
                    categories: ['Uncategorised']
                },

                isValid: false
            }
        },
        // computed: {
        //     // ...mapGetters([ 
        //     //     'getAccounts'
        //     // ])
        // },
        methods: {

            validate() {
                if(this.item.categories.length === 0){
                    this.item.categories = ["Uncategorized"];  
                }
                if(this.item.name.length > 30){
                    this.item.name = this.item.name.replace(/^(.{30}).+/, "$1...");
                }
                if(this.item.amount.length > 30){
                    this.item.amount = this.item.amount.replace(/^(.{30}).+/, "$1...");
                }
                if(this.item.description.length > 60){
                    this.item.description = this.item.description.replace(/^(.{60}).+/, "$1...");
                }

                let checkAmount = () => {
                    if(this.item.amount != null){
                        return true;
                    }else {console.log("--Amount == 0")}
                };
    


                if(checkAmount()){
                    return true;
                }   
            },

            amountCheck() {
                    // Prevent "<0" value
                this.item.amount = this.item.amount < 0 ? this.item.amount = 0 : this.item.amount;

                if(this.item.amount != null){
                    let stringAmount = this.item.amount.toString(); // ".startsWith" accept string only
                    // Prevent "0" on start
                    this.item.amount = stringAmount.startsWith(0) ? this.item.amount.substring(1) : this.item.amount;
                    // Prevent "." on start
                    this.item.amount = stringAmount.startsWith(".") ? this.item.amount.substring(1) : this.item.amount
                }
                    // Activate Submit btn
                this.isValid = this.item.amount > 0 ? this.isValid = true : this.isValid = false;
                
                return true;
            },

            close () {
                // this.dialog = false
                // setTimeout(() => {
                // this.item = Object.assign({}, this.defaultItem)
                // }, 300)

                this.item = Object.assign({}, this.defaultItem);

                // this.close();
                if(this.newModal){
                    this.newModal.isOpen = false;
                }else {
                    console.log("is Edit mode");
                }

                if(this.editModal){
                    this.editModal.isOpen = false;
                }else {
                    console.log("is addNew mode");
                }
            },

            saveRecord() {
                if(this.validate()){
                    if (this.editModal){
                        // Update
                        this.$store.commit('editRecord', this.item);

                        // setTimeout(() => {
                        // this.editModal = false;
                        // }, 1000)

                    }else {
                        // Add new
                        this.item.id = Date.now();
                        //this.item.date = Helper.today();
                        this.item.avatar = "def"

                        this.$store.commit('saveRecord', this.item);
                        //this.dialogNew = false;
                    }
                    console.log(this.$store.state.items);


                    this.close();

                }
            },
            
            clear () {
                this.$refs.form.reset()
            }
        },
        watch: {

            formEditData: function(){
                            // if props coming - fill up modal by item data
                this.item = Object.assign(this.item, this.formEditData);
                //this.amount = this.item.amount; 
                        console.log("+++++++++++")
                        console.log(this.item.amount)
            },

            // Conver date format from datepicker
            date: function(val, oldVal) {
                this.item.date = Helper.convertDateFormat(val);
            },

            // datestring: function(val){
            //     console.log("-----"+ val)
            // }

            // amount: function(val){
            //     if(val > 0){
            //         this.isValid = true;
            //         this.item.amount = val;
            //     }else {
            //         this.isValid = false; 
            //     }
            // }

            // dialogNewModal: function(){
            //     console.log("dialogNewModal")
            //     console.log(dialogNewModal)
            //     // if(this.dialogNew){
            //     //     console.log("Click Add New");
            //     //     // this.item.account === null ? this.item.account = "Cache" : this.item.account;
            // }

            // },
            // item: function() {
            //     // Prevent ">0" value
            //     this.item.amount = this.item.amount < 0 ? this.item.amount = 0 : this.item.amount;
            //     // Prevent "0" on start
            //     this.item.amount = this.item.amount.startsWith(0) ? this.item.amount.substring(1) : this.item.amount;

            // }
        }

    }

                // class Item {
            //     constructor(expInc = true, planned = false, id = null, date = Helper.today(), avatar = null,
            //         name = "", description = "", amount = null, account = 'Cache',
            //         accountOptions = this.$store.state.accountOptions, currency = '€', currencyOptions = this.$store.state.currencyOptions,
            //         categories = ['Uncategorised'], categoriesOptions = this.$store.state.categoriesOptions)
            //        {
            //         this.expInc = expInc;
            //         this.planned = planned,
            //         this.id = id,
            //         this.date = date,
            //         this.avatar = avatar,
            //         this.name = name,
            //         this.description = description,
            //         this.amount = amount,
            //         this.account = account,
            //         this.accountOptions = accountOptions,
            //         this.currency = currency,
            //         this.currencyOptions = currencyOptions,
            //         this.categories = categories,
            //         this.categoriesOptions = categoriesOptions
            //     }
            // }  
</script>

