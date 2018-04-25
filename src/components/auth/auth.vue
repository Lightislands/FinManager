<template>
  <div>
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" href="#">Auth0 - Vue</a>

          <router-link :to="'/'"
            class="btn btn-primary btn-margin">
              Home
          </router-link>

          <button
            class="btn btn-primary btn-margin"
       
            @click="login()">
              Log In
          </button>

          <button
            class="btn btn-primary btn-margin"
   
            @click="logout()">
              Log Out
          </button>

        </div>
      </div>
    </nav>

    <div class="container">

    </div>
  </div>
</template>

<script>

// import AuthService from './AuthService.js'
import auth0 from '../../../node_modules/auth0-js/build/auth0.js'
import authConfig from './auth0-variables.js'

export default {
 
  data () {
    return {
        webAuth: new auth0.WebAuth(authConfig.auth0Data())
    }
  },
  methods: {
    login(){
        this.webAuth.authorize();
    }
  }
}
</script>