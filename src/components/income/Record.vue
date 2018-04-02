<template>
    <div class="col-sm-6">
        <h2>record</h2>
        <div class="panel panel-success">
            <div class="panel-heading">
                <h3 class="panel-title">{{record.name}} <small>(Price: {{record.price}})</small></h3>
            </div>
            <div class="panel-body">
                <div class="pull-left">
                    <input type="number" class="form-control" placeholder="Quantity" v-model="quantity">
                </div>
                <div class="pull-right">
                    <button class="btn btn-success" @click="buyStock" :disabled="quantity <=0">Buy</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['record'],  // S2. export data from loop (Records.vue)

        methods: { // data of individual record from loop
            buyStock() {
                const order = {
                    stockId: this.record.id,
                    stockPrice: this.record.price,
                    quantity: this.quantity
                };
                console.log(order);
            }

        }
    }
</script>