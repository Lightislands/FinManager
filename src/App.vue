<template>
    <div class="container">
        <app-auth></app-auth>

        <app-header></app-header>

        <div class="row">
            <div class="col-xs-12">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from './components/Header.vue';
    import storeAuth from './store/auth';

    import Auth from './components/auth/auth.vue';

    export default {
        components: {
            appHeader: Header,
            appAuth: Auth
        },

        created() {
            // this.$store.dispatch('initRecords');
            storeAuth.dispatch('tryAutoLogin');
        }
    }
</script>

<style>
    body {
        padding: 30px;
    }
</style>
