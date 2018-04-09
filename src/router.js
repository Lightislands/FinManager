import Home from './components/Home.vue';
import Expense from './components/Expense.vue';
// import Income from './components/income/Records.vue';
import Income from './components/Income.vue';


export const routes = [
    { path: '/', component: Home},
    { path: '/expense', component: Expense},
    { path: '/income', component: Income},
    { path: '*', redirect: '/' }
];