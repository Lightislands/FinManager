import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
   state: {
 
       items: [
           {
               value: false,
               id: '1521930771252',
               date: 'Frozen Yogurt',
               avatar: 159,
               name: 6.0,
               categories: 24,
               amount: 4.0,
               account: '1%'
           },
           {
               value: false,
               id: '1521930771253',
               date: 'Ice cream sandwich',
               avatar: 237,
               name: 9.0,
               categories: 37,
               amount: 4.3,
               account: '1%'
           },
           {
               value: false,
               id: '1521930771254',
               date: 'Eclair',
               avatar: 262,
               name: 16.0,
               categories: 23,
               amount: 6.0,
               account: '7%'
           }
       ]


   },
    getters: {
        getAllRecords: state => {
            return state.items;
        },
        getTestName: state => {
            return "Some Name to test spreed operator in Records.vue";
        }
    },
    mutations: {
        addRecord: (state, n) => {
            state.items.push(n);
        },

        editRecord: (state, updatedData) => {
            for (var i in state.items) {
                if (state.items[i].id == updatedData.id) {
                    state.items[i].name = updatedData.name;
                    state.items[i].categories = updatedData.categories;
                    state.items[i].amount = updatedData.amount;
                    state.items[i].account = updatedData.account;
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

        }
        
    }
});