import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import CitoyenBord from '../views/CitoyenBord';
import MedecinBord from "../views/MedecinBord";
import AdminBord from "../views/AdminBord";
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
  },
  {
    path: '/bord/medecin',
    name: 'MedecinBord',
    component: MedecinBord
  },
  {
    path: '/bord/admin',
    name: 'AdminBord',
    component: AdminBord
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
