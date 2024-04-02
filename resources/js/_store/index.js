import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import Cookies from 'js-cookie';
import cookie from 'cookie';

import cart from './cart.module';
import user from './user.module';
import product from './product.module';
import history from './history.module';

const initCookies = {
    getItem: (key) => Cookies.get(key),
    setItem: (key, value) => Cookies.set(key, value, { secure: false, expires: 3 }), // Removed `secure: true`
    removeItem: (key) => Cookies.remove(key),
};

export default createStore({
    modules: {
        cart,
        user,
        product,
        history
    },
    plugins: [
        createPersistedState({
            key:'laravel-vue-ecommerce',
            paths: ['cart', 'user', 'product'],
            storage: import.meta.env.DEV ? window.localStorage : initCookies,

        }),
    ],
});
