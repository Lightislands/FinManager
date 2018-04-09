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
                    <div :class="{warning: nameNotValid}">
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
                </div>


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
                id: null,
                date: null,
                name: null,
                amount: null,
                categories: null,
                account: null,

                nameNotValid: false,
                amountNotValid: false
            }
        },
        methods: {
            validate() {
// Set Default values
                    if(this.categories === null){
                        this.categories = "Uncategorized";
                    }
                    if(this.account === null){
                        this.account = "Cache";
                    }

                    
                    // Check if !empty
                    this.nameNotValid = false;
                    this.amountNotValid = false;
                    if(!this.name) {
                        this.nameNotValid = true;
                    } else if(!this.amount) {
                        this.amountNotValid = true;
                    } else {
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
                            name: this.name,
                            amount: this.amount,
                            categories: this.categories,
                            account: this.account
                            }
                        );
                    }
                }


//                console.log(this.$store.state.items);
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

