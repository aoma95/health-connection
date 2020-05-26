import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import CitoyenBord from '../views/CitoyenBord';
Vue.use(VueRouter);

export const routes= [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/bord/citoyen',
    name: 'CitoyenBord',
    component: CitoyenBord
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
