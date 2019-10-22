import Vue from 'vue';
import Router from 'vue-router';
import Landing from './views/Landing.vue';
import Mens from './views/Mens.vue';
import Detail from './views/Detail.vue';
import Cart from './views/Cart.vue';
import Checkout from './views/Checkout.vue';
import About from './views/About.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'main',
      component: Landing,
    },
    {
      path: '/admin',
      name: 'admin',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ './views/Admin.vue'),
    },
    {
      path: '/mens',
      name: 'mens',
      component: Landing,
      props: { keyword: 'men' },
    },
    {
      path: '/womens',
      name: 'womens',
      component: Landing,
      props: { keyword: 'women' },
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/all',
      name: 'all',
      component: Landing,
      props: true,
    },
    {
      path: '/detail',
      name: 'detail',
      component: Detail,
      props: true,
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart,
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: Checkout,
    },
  ],
});
