import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
   state: {
 
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
            { header: 'Group 2' },
            { name: 'Britta Holt' },
            { name: 'Jane Smith ' },
            { name: 'John Smith' },
            { name: 'Sandra Williams' }
        ]


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
        }
    },
    mutations: {
        init: () => {
            let data = localStorage.getItem('items')
            let parsed = JSON.parse(data);
            //state.items = parsed
            console.log("++++++++++++++")
            console.log(parsed)
            console.log("++++++++++++++")
        },

        saveRecord: (state, n) => {
            state.items.push(n);

            localStorage.setItem('items', JSON.stringify(state.items));
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

        }
        
    }
});