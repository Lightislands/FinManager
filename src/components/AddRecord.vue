<template>
    <div class="col-sm-12">
        <div class="panel panel-success">
            <div class="panel-body">

                <div v-if="isEdit">
                    <div>
                        <input type="text" class="form-control" :placeholder="formEditData.name"  v-model="name">
                    </div>
                    <div>
                        <input type="text" class="form-control" :placeholder="formEditData.categories" v-model="categories">
                    </div>
                    <div>
                        <input type="number" class="form-control" :placeholder="formEditData.amount" v-model="amount">
                    </div>
                    <div>
                        <input type="text" class="form-control" :placeholder="formEditData.account" v-model="account">
                    </div>
                    <div class="pull-right">
                        <button class="btn btn-success" @click="addRecord" :disabled="quantity <=0">Add</button>
                    </div>
                </div>

                <div v-else>
                    <div>
                        <input id="newItemName" type="text" class="form-control" placeholder="Name" v-model="name">
                    </div>
                    <div>
                        <input id="categories" type="text" class="form-control" placeholder="Categories" v-model="categories">
                    </div>
                    <div>
                        <input id="amount" type="number" class="form-control" placeholder="Amount" v-model="amount">
                    </div>
                    <div>
                        <input id="account" type="text" class="form-control" placeholder="Account" v-model="account">
                    </div>
                    <div class="pull-right">
                        <button class="btn btn-success" @click="addRecord" :disabled="quantity <=0">Add</button>
                    </div>
                </div>


                <br /> <br /> <hr />

            </div>
        </div>
    </div>
</template>

<script>
//    import { mapMutations } from 'vuex';

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
                categories: "Uncategorized",
                account: "Cache"
            }
        },
        methods: {
            addRecord() {

                if (this.isEdit) {                              // If Edit Mode

                    // 1. Check if input value !empty
                    if(this.name === null){
                        this.name = this.formEditData.name;
                    }
                    if(this.amount === null){
                        this.amount = this.formEditData.amount;
                    }
                    if(this.date === null){
                        this.date = this.formEditData.date;
                    }


                    let updatedData = {
                        id: this.formEditData.id, // leave old id and date
                        name: this.name,
                        amount: this.amount,
                        categories: this.categories,
                        account: this.account
                    };

                    this.$store.commit('editRecord', updatedData);



                } else {                                        // If Create New Mode
                    this.$store.commit('addRecord', {
                                id: Date.now(),
                                name: this.name,
                                amount: this.amount,
                                categories: this.categories,
                                account: this.account
                            }
                    );
                }


//                console.log(this.$store.state.items);
            }
        }

    }
</script>

