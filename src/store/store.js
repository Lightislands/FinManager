import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
   state: {
 
       items: [
           {
               value: false,
               id: '1521930771252',
               date: 'Feb 03',
               avatar: 'A',
               name: 'John Smidt',
               description: '',
               categories: 'Cat1',
               amount: 457,
               currency: '$',
               planned: false,
               account: 'Card',
               type: 'income'
           },
           {
               value: false,
               id: '1521930771253',
               date: 'Feb 04',
               avatar: 'B',
               name: 'Elis Melamory',
               description: 'description',
               categories: 'Cat2',
               amount: 5888,
               currency: '$',
               planned: true,
               account: 'Cache',
               type: 'expense'
           },
           {
               value: false,
               id: '1521930771254',
               date: 'Feb 05',
               avatar: 'C',
               name: 'Ivan Pupkin',
               description: '',
               categories: 'Uncategorized',
               amount: 234,
               currency: '$',
               planned: false,
               account: 'Cart1',
               type: 'income'
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