import { createRouter, createWebHistory } from 'vue-router';
import Home from '../Pages/Home.vue';
import Productdetail from '../Pages/Productdetail.vue'; 
import UserCart from '../Pages/UserCart.vue';
import AllProducts from '../Pages/AllProducts.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/products/:id', name: 'ProductDetail', component: Productdetail }, 
  {path : '/Cart' , name: 'Usercart' , component:UserCart},
  {path:'/products', name:'Allproducts', component: AllProducts }
]; 

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
      return { top: 0 }; 
    }
  });

export default router;
