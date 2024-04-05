import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Detail from "../views/DetailV2.vue";
import Cart from "../views/Cart.vue";
import Product from "../views/Product.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Message from "../views/Message.vue";
import Payment from "../views/Payment.vue"

//social
import PhoneComponent from "../views/social/Phone.vue"
import RegisterComponent from "../views/social/Register.vue"

import store from "../_store";
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            component: Home,
            meta: {
                layout: "Default",
            },
        },
        {
            path: "/detail/:id",
            name: "detail",
            props: true,
            component: Detail,
            meta: {
                layout: "Default",
            },
        },
        {
            path: "/products",
            name: "products",
            component: Product,
            meta: {
                layout: "Default",
            },
        },
        {
            path: "/carts",
            name: "carts",
            component: Cart, //cart,
            meta: {
                layout: "Default",
            },
        },
        {
            path: "/login",
            name: "login",
            component: Login,
            meta: {

                isAuthenticated: true,
            }
        },
        {
            path: "/register",
            name: "register",
            component: Register,
            meta: {

                isAuthenticated:false,
            },

        },

        {
            path: "/message",
            name: "message",
            component: Message,
            meta: {
                layout: "Default",
                isAuthenticated:true,

            },
        },
        {
            path: "/payment",
            name: "payment",
            component: Payment,
            meta: {
                layout: "Default",
                isAuthenticated: true,
            }
        },
        {
            path: "/social/register",
            name: "RegisterComponent",
            component: RegisterComponent,
            meta: {


            }
        },
        {
            path: "/social/phone-number",
            name: "PhoneComponent",
            component: PhoneComponent,
            meta: {

            }
        }

    ],
});
router.beforeEach((to, from, next) => {
   /*  //console.log("from",from);
    console.log("to",store.user);
    //check component register
    let fullPath = to.meta.redirectedFrom =  from.fullPath;
    store.dispatch('history/setRedirectedFrom',fullPath)

    if(to.matched.some((record) => record.meta.requireMessage) &&
        store.state.user.isRegister == false && store.state.user.isLogin == false){
        next('/login')
    }
    if(to.matched.some((record) => record.meta.requireRegister) &&
        store.state.user.isRegister == true && store.state.user.isLogin == false){
        next('/products')
    }
    if(to.matched.some((record) => record.meta.requireLogin) && store.state.user.isLogin===false){
        next('/login')
    }
 */
    let fullPath = to.meta.redirectedFrom =  from.fullPath;
    store.dispatch('history/setRedirectedFrom',fullPath)
    if(to.matched.some((record) => record.meta.isAuthenticated) && !store.state.user.isLogin && to.name !== 'login'){
        next('/login')
    }
    next();


});
export default router;
