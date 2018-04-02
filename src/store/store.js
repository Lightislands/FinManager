import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
   state: {
       records: []
   },
    getters: {
        getAllRecords: state => {
            return state.records;
        },
        getName: state => {
            return "Some Name";
        }
    },
    mutations: {
        addRecord: (state, n) => {
            state.records.push(n);
        }
    }
});