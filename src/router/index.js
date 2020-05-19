import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import MembreBord from '../views/MembreBord';
Vue.use(VueRouter);

export const routes= [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/bord/membre',
    name: 'MembreBord',
    component: MembreBord
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
