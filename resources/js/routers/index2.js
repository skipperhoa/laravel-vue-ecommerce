import {createWebHistory, createRouter} from 'vue-router'
import Home from '../views/Home.vue'
import Detail from '../views/DetailV2.vue'
import Cart from '../views/Cart.vue'
import Product from '../views/Product.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => Home,
            meta: {
                layout: 'Default',
              },
        },
        {
            path: '/products',
            name: 'products',
            component: () => Product,
            meta: {
                layout: 'Default',
              },
        },
        {
            path: '/detail/:id',
            name: 'detail',
            component: () => Detail,
            meta: {
                layout: 'Default',
              },
        },
        {
            path: '/carts',
            name: 'carts',
            component: () => Cart,
            meta: {
                layout: 'Default',
              },
        },
        {
            path: '/login',
            name: 'login',
            component: () => Login,

        },
        {
            path: '/register',
            name: 'register',
            component: () => Register,

        }
    ]
})

export default router
