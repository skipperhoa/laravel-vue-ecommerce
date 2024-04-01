import {productService} from '../_services';
export default{
    namespaced: true,
    state:{
        items:null
    },
    getters:{
        items: (state) => {
            return state.items;
        },

    },
    mutations:{
        setUpProduct:(state,products)=>{
            state.items = products.data;
        }

    },
    actions:{
        getAllProducts: ({ commit },query) => {
            productService.getAllProducts(query).then((res) => {
                commit("setUpProduct", res.data);

            });
        },

    }
}
