import Vue from 'vue';
import Vuex from 'vuex';
import axios from '../axios-auth'; // for sign up/log in
import globalAxios from 'axios'; // for storing and fething user data

Vue.use(Vuex);

export const store = new Vuex.Store({
   state: {
       idToken: null,
       userId: null,
       user: null,
 
       items: [
           {
               value: false,
               id: '1521930771252',
               date: '10.03.2018',
               avatar: 'A',
               name: 'John Smidt',
               description: '',
               categories: ['Cat1'],
               amount: 457,
               currency: '$',
               planned: false,
               account: 'Cache',
               expInc: false
           },
           {
               value: false,
               id: '1521930771253',
               date: '06.04.2018',
               avatar: 'Pl',
               name: 'Elis Melamory',
               description: 'description',
               categories: ['Cat2','Uncategorized'],
               amount: 5888,
               currency: '$',
               planned: true,
               account: 'Cache',
               expInc: true
           },
           {
               value: false,
               id: '1521930771254',
               date: '02.05.2018',
               avatar: 'C',
               name: 'Ivan Pupkin',
               description: '',
               categories: ['Uncategorized'],
               amount: 234,
               currency: '€',
               planned: false,
               account: 'Cache',
               expInc: true
           }
       ],

        accountOptions: [
            'Cache',
            'Credit cart',
            'Cart'
        ],

        currencyOptions: [
            '$',
            '€'
        ],

        categoriesOptions: [
            { name: 'Uncategorised' },
            { name: 'Ali Connors' },
            { name: 'Trevor Hansen' },
            { name: 'Tucker Smith' },
            { name: 'Britta Holt' },
            { name: 'Jane Smith ' },
            { name: 'John Smith' },
            { name: 'Sandra Williams' }
        ]


   },
   mutations: {

    // init: () => {
    //     let data = localStorage.getItem('items')
    //     let parsed = JSON.parse(data);
    //     state.items.push(parsed)
    //     console.log("+++++++ Init +++++++")
    // },

    saveRecord: (state, n) => {
        state.items.push(n);
        // localStorage.setItem('items', JSON.stringify(state.items));
    },

    editRecord: (state, updatedData) => {
        for (var i in state.items) {
            if (state.items[i].id == updatedData.id) {
                state.items[i] = Object.assign(state.items[i], updatedData);
                break;
            }
        }
    },

    deleteRecord: (state, record) => {
        for(var i = 0; i < state.items.length; i++) {
            if(state.items[i].id == record.id) {
                state.items.splice(i, 1);
                break;
            }
        }

        // for (const value of state.items) {
        //     console.log(value);
        //         if(value.id == record.id) {
        //             state.items.splice(value, 1);
        //             break;
        //         }
        // }

    },

    authUser (state, userData) {
        state.idToken = userData.token;
        state.userId = userData.userId;
    },
    storeUser (state, user){
        state.user = user;
    },

    
},

    actions: {
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
                })
                dispatch('storeUser', authData) // Run "storeUser" action
              })
              .catch(error => console.log(error))
        },
        login ({commit}, authData) {
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
                        })
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
        }

    },

    getters: {
        getAllRecords: state => {
            return state.items;
        },
        getAccounts: state => {
            return state.accountOptions;
        },
        getTestName: state => {
            return "Some Name to test spreed operator in Records.vue";
        },
        user (state) {
            return state.user
        }
    },
});