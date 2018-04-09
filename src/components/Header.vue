<template>
    <div class="head-wrap">

        <div class="left-side">
            <router-link to="/"  active-class="active"><a>Home</a></router-link>
            <router-link to="/expense" active-class="active"><a>Expense</a></router-link>
            <router-link to="/income" active-class="active"><a>Income</a></router-link>
        </div>

        <div class="right-side">
            <div>
                <v-btn fab large color="green" @click.stop="dialog = true">
                    <v-icon dark>add</v-icon>
                </v-btn>
            </div>

            <v-dialog v-model="dialog" max-width="500px">
                <v-card>
                    <v-card-title>
                        <span class="headline"> Add record NEW </span>
                    </v-card-title>

                    <app-add-record></app-add-record>

                </v-card>
            </v-dialog>
        </div>
    </div>

</template>

<script>
    import AddRecord from './AddRecord.vue';
    export default {
        data () {
            return {
                dialog: false // Modal
            }
        },
        components: {
            appAddRecord: AddRecord
        }
    }
</script>

<style>
    .head-wrap {
        flex-direction: row;
        justify-content: space-between;
    }
    .left-side {
        display: flex;
    }
        a {
            padding: 10px 20px 0 0;
            font-size: 1.5rem;
        }

    .right-side {
        float: right;
        margin-top: -60px;
    }

    .dialog .card {
        background-color: #fff;
        overflow: hidden;
    }

    .btn__content {
        color: #fff;
    }
</style>
