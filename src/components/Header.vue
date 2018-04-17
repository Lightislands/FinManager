<template>
    <div class="head-wrap">
{{dialogNewModal.isOpen}}
{{dialogNew}}
        <div class="left-side">
            <router-link to="/"  active-class="active"><a>Home</a></router-link>
            <router-link to="/expense" active-class="active"><a>Expense</a></router-link>
            <router-link to="/income" active-class="active"><a>Income</a></router-link>
        </div>

        <div class="right-side">
            <div>
                <v-btn slot="activator" fab large color="green" @click="dialogNew = true">
                    <v-icon dark>add</v-icon>
                </v-btn>
            </div>

            <v-dialog v-model="dialogNew" max-width="500px" @keydown.esc="dialogNew = false">
                <v-card>
                    <v-card-title>
                        <span class="headline">Add new</span>
                    </v-card-title>

                    <app-add-record :newModal="dialogNewModal"></app-add-record>

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
                dialogNewModal: {isOpen: true},
                dialogNew: false // Modal
            }
        },
        components: {
            appAddRecord: AddRecord
        },
        computed: {
            isOpen() {
                return this.dialogNewModal.isOpen;
            }
        },
        watch: {
           isOpen() {
               this.dialogNew = false;
            },
            dialogNew(){
                if(!this.dialogNewModal.isOpen){
                    this.dialogNewModal.isOpen = true;
                }
            }
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
