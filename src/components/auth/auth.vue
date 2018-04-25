<template>
  <div>
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
</template>

<script>

// import AuthService from './AuthService.js'

// import auth0 from '../../../node_modules/auth0-js/build/auth0.js'
import authConfig from './auth0-variables.js'

// import lockAuth from '../../../node_modules/auth/lock.min.js'
import lockAuth from './lock.min.js'

export default {
 
  data () {
    return {
        lock: new Auth0LockPasswordless(
            authConfig.auth0Data().clientID,
            authConfig.auth0Data().domain,
            authConfig.auth0Data().options
            )
    }
  },
  methods: {
    login(){
        this.lock.show();
    }
  }
}
</script>