import './bootstrap';
import { createApp } from 'vue'
import App from './App.vue'
import router from './routers';
import  store from './_store';
import { registerLayouts } from './layouts/register2';
const app = createApp({
components:{
    App
}
});
app.use(store)
//check token expire
let token = store.state.user.token;
store.dispatch('user/checkToken',token)
//call product
//store.dispatch('product/getAllProducts',{page:1})
app.use(router);
console.log("VITE_API_URL",import.meta.env)
console.log(import.meta.env.DEV)
registerLayouts(app);
app.mount('#app');
