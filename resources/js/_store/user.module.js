import {userService} from '../_services';
import axios, { AxiosError } from 'axios';
export default{
    namespaced: true,
    state:{
        isLogin: false,
        isRegister: false,
        isRememberMe:false,
        token:null,
        _user:null,
        test:"hoa"
    },
    getters:{
        user: (state) => {
            return state._user;
        },
        token: (state) => {
            return state.token;
        },
        isLogin: (state) => {
            return state.isLogin;
        },
        isRegister: (state) => {
            return state.isRegister;
        }

    },
    mutations:{
        onLogin:function(state, res){
            console.log("Res",res);
            state.isLogin = true;
            state.token = res.authorisation.token;
            state._user = res.user;
            state.isRememberMe = res.isRememberMe;
        },
        onRegister: (state, isRegister) => {
            state.isRegister = isRegister;

        },
        updateUser: (state, user) => {
            state._user = user;
        },
        updateToken: (state, token) => {
            state.token = token;
        },
        logout: (state, res) => {
            if(res.data.status==='success' || res.data.message==="Unauthenticated."){
                state.isLogin = false;
                state.token = null;
                state._user = null;
                state.isRememberMe = false;
                state.isRegister = false;

            }
            localStorage.setItem('user', null);
            localStorage.removeItem('laravel-vue-ecommerce');


        }

    },
    actions:{
        onLogin: ({commit,rootState, dispatch}, user) => {
            userService.login(user).then(
                (res) => {
                    res.isRememberMe = user.remember_me;
                    commit('onLogin', res);
                    dispatch('cart/getAllCarts',null, { root: true })

                });
        },
        onRegister: ({commit}, isRegister) => {
            commit('onRegister',isRegister)
        },
        updateUser: ({commit}, user) => {
            commit('updateUser', user);
        },
        updateToken: ({commit}, token) => {

            commit("updateToken", token);
        },

        logout: ({commit,rootState}, token) => {

            userService.logout(token).then(
                (res) => {
                   commit("logout",res);
                   //update state cart
                   rootState.cart.carts=[];
                   rootState.cart.products = []
                   rootState.product.items = [];
                }
            )
        },
        checkToken: ({commit,rootState}, token) => {
            userService.checkToken(token)
                .then((response) => {
                    console.log("response", response);
                    if (response.data.message === "Success") {
                        // Token is valid
                        console.log("Token is still valid");

                    }
                }).catch((error) => {
                    // Handle error
                    if (error.response) {
                        console.log('Token is expired or invalid');
                        //console.log("a")
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        // console.log(error.response.data);
                        // console.log(error.response.status);
                        // console.log(error.response.headers);
                        commit("logout", error.response);

                        //remove state when token is invalid
                        rootState.cart.carts=[];
                        rootState.cart.products = []
                        rootState.product.items = [];

                    } else if (error.request) {
                        // The request was made but no response was received
                        console.log(error.request);
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log('Error', error.message);
                    }
                    console.log(error.config);
                });
        }

    }
}
