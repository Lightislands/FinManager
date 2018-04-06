import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
   state: {
 
       items: [
           {
               value: false,
               id: '1521930771252',
               date: '20.03.2018',
               avatar: 'def',
               name: 'John Smidt',
               categories: 'Cat1',
               amount: 457,
               account: 'Card'
           },
           {
               value: false,
               id: '1521930771253',
               date: '25.02.2018',
               avatar: 'def',
               name: 'Elis Melamory',
               categories: 'Cat2',
               amount: 5888,
               account: 'Cache'
           },
           {
               value: false,
               id: '1521930771254',
               date: '27.02.2018',
               avatar: 'def',
               name: 'Ivan Pupkin',
               categories: 'Uncategorized',
               amount: 234,
               account: 'Cart1'
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