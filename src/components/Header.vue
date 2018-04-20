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
                <v-btn slot="activator"  @click="dialogLogIn = true">Log In</v-btn>
            </div>
            <v-dialog v-model="dialogLogIn" max-width="500px" @keydown.esc="dialogLogIn = false">
                <v-card>
                    <v-card-title><span class="headline">Log In</span></v-card-title>
                    <app-log-in></app-log-in>
                </v-card>
            </v-dialog>


            <div>
                <v-btn slot="activator"  @click="dialogSignUp = true">Sign Up</v-btn>
            </div>
            <v-dialog v-model="dialogSignUp" max-width="500px" @keydown.esc="dialogSignUp = false">
                <v-card>
                    <v-card-title><span class="headline">Sign Up</span></v-card-title>
                    <app-sign-up></app-sign-up>
                </v-card>
            </v-dialog>


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
    import SignUp from './auth/signup.vue';
    import LogIn from './auth/signin.vue';

    export default {
        data () {
            return {
                dialogNewModal: {isOpen: true},
                dialogNew: false, // Modal
                dialogSignUp: false,
                dialogLogIn: false
            }
        },
        components: {
            appAddRecord: AddRecord,
            appSignUp: SignUp,
            appLogIn: LogIn
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
