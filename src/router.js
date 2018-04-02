import Home from './components/Home.vue';
import Income from './components/income/Records.vue';


export const routes = [
    { path: '/', component: Home},
    { path: '/income', component: Income},
    { path: '*', redirect: '/' }
];