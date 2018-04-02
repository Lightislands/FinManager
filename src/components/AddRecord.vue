<template>
    <div class="col-sm-12">
        <h2>Add record</h2>
        <div class="panel panel-success">
            <div class="panel-body">
                <div class="pull-left">
                    <input type="number" class="form-control" placeholder="Amount" v-model="amount">
                </div>
                <div class="pull-left">
                    <input type="text" class="form-control" placeholder="Name" v-model="name">
                </div>
                <div class="pull-right">
                    <button class="btn btn-success" @click="addRecord" :disabled="quantity <=0">Add</button>
                </div>
                <br /> <br /> <hr />
                <p>{{amount}}</p>
                <p>{{name}}</p>
            </div>
        </div>
    </div>
</template>

<script>
//    import { mapMutations } from 'vuex';

    export default {
//        methods: {
//                ...mapMutations([
//                    'addRecord'
//                ])
//        },
        data(){
            return {
                name: "",
                amount: 0,
//                record: []
            }
        },
        methods: {
            addRecord() {
//                this.record.push({
//                    name: this.name,
//                    amount: this.amount
//                }
//                );

//                this.$store.state.records.push(
//                        {name: this.name, amount: this.amount}
//                );

                this.$store.commit('addRecord', {name: this.name, amount: this.amount});
                console.log(this.$store.state.records);
            }
        }
    }
</script>

