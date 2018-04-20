import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios-auth'
import globalAxios from 'axios'

Vue.use(Vuex)

export const storeAuth = new Vuex.Store({
    state: {
        idToken: null,
        userId: null,
        user: null,
    },

    mutations: {
 
         authUser (state, userData) {
             state.idToken = userData.token;
             state.userId = userData.userId;
         },
         storeUser (state, user){
             state.user = user;
         },
         clearAuthData (state) {
             state.idToken = null;
             state.userId = null;
         }
         
     },
 
     actions: {
         setLogoutTimer ({commit, dispatch}, expirationTime) {
            setTimeout(() => {
                //commit('clearAuthData');
                dispatch('logout');
            }, expirationTime * 1000)
         },
         signup ({commit, dispatch}, authData) { // Run commit and dispatch in .then
             console.log("signupNewUser ---- ")
             axios.post('/signupNewUser?key=AIzaSyAjkRSwDz9ssjhJQfG7eKur7Wp1DTS7_xI', {
                 email: authData.email, // Get "authData" from signup.vue
                 password: authData.password,
                 returnSecureToken: true
               })
               .then(res => {
                 console.log("signup ---- ")
                 console.log(res)
                 commit('authUser', { // Save data to store
                   token: res.data.idToken,
                   userId: res.data.localId
                 });
                 const now = new Date();
                 const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000);
                 localStorage.setItem('token', res.data.idToken);
                 localStorage.setItem('userId', res.data.localId);
                 localStorage.setItem('expirationDate', expirationDate);
                 dispatch('storeUser', authData); // Run "storeUser" action
                 dispatch('setLogoutTimer', res.data.expiresIn);
               })
               .catch(error => console.log(error))
         },
         login ({commit, dispatch}, authData) {
             axios.post('/verifyPassword?key=AIzaSyAjkRSwDz9ssjhJQfG7eKur7Wp1DTS7_xI', {
                 email: authData.email,
                 password: authData.password,
                 returnSecureToken: true
               })
                 .then(res => {
                         console.log(res);
                         commit('authUser', {
                             token: res.data.idToken,
                             userId: res.data.localId
                         });
                         const now = new Date();
                         const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000);
                         localStorage.setItem('token', res.data.idToken);
                         localStorage.setItem('userId', res.data.localId);
                         localStorage.setItem('expirationDate', expirationDate);
                         dispatch('setLogoutTimer', res.data.expiresIn);
                     })
                     .catch(error => console.log(error))      
         },
 
         storeUser ({commit, state}, userData){
             if(!state.idToken){ // If we don't have a token - don't send request
                 console.log("No token")
                 return
             }
             globalAxios.post('/users.json' + '?auth=' + state.idToken, userData) // After Authentication - Store user in DB (not authentication)
                 .then(res => console.log("res"+res))
                 .catch(error => console.log(error))
         },
 
         fetchUser ({commit, state}){ // Do it when "Records.vue" component created
             if(!state.idToken){
                 return
             }
             globalAxios.get('/users.json' + '?auth=' + state.idToken)
                 .then(res => {
                     // console.log(res);
                     const data = res.data;
                     const users = [];
                     for (let key in data){
                         const user = data[key];
                         user.id = key;
                         users.push(user);
                     }
                     console.log("========= users =========");
                     console.log(users);
                     this.email = users[0].email;
                     commit('storeUser', users[0]) // mutation "storeUser"
                 })
                 .catch(error => console.log(error))
         },
 
         logout ({commit}){
             commit('clearAuthData');
             // router.replace('/');
             localStorage.removeItem('expirationDate')
             localStorage.removeItem('token')
             localStorage.removeItem('userId')
             window.location.replace('/');
         },

        // Check if user loged in if page reload
         tryAutoLogin ({commit}) {
            const token = localStorage.getItem('token');
            if (!token) {
                return
            }
            const expirationDate = localStorage.getItem('expirationDate');
            const now = new Date();
            if (now >= expirationDate) {
                return
            }
            const userId = localStorage.getItem('userId');
            commit('authUser', {
                token: token,
                userId: userId
            })
         }
     },
 
     getters: {
         user (state) {
             return state.user
         },
         isLogedIn(state){
             return state.idToken !== null
         }
     }
})

export default storeAuth