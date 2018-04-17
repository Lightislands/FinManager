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
               date: 'Feb 04',
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
               date: 'Feb 05',
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
        saveRecord: (state, n) => {
            state.items.push(n);
        },

        editRecord: (state, updatedData) => {
            for (var i in state.items) {
                if (state.items[i].id == updatedData.id) {
                    state.items[i] = Object.assign(state.items[i], updatedData);
                    // state.items[i].name = updatedData.name;
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