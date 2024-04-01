import { productService, cartService } from '../_services/index'

export default{
    namespaced: true,
    state: {
        products: null,
        carts: [],
        toast: {
            text: "",
            show: false
        }
    },
    getters: {
        cartSize: (state) => {
            return state.carts.length;
        },
        cartTotalAmount: (state) => {
            return state.carts.reduce((total, product) => {
                return total + (product.price * product.quantity);
            }, 0);
        },
        toast: (state) => {
            return state.toast;
        }
    },
    mutations: {
        setUpProducts: (state, productsPayload) => {
            //sets the state's  products property to the products array recieved as payload
            state.products = productsPayload;
        },
        addToCart: (state, payload) => {
           const {id,token} = payload
            //find the product in the cart list
            let cartItem = state.carts.find((product) => product.id === id);

            if (cartItem) {
                //product already present in the carts. so increase the quantity
                cartItem.quantity++;
            } else {
                state.carts.push({
                    // product newly added to cart
                    ...payload,
                    quantity: 1,
                });
            }
            let object = {
                product_id: id,
                quantity: cartItem?cartItem.quantity:1,

            }
            cartService.postCartItem(object,token).then(res=>{
                console.log("message add cart",res)

            })


        },



        removeFromCart: (state, productId) => {

            //find the product in the cart list
            let cartProduct = state.carts.find((product) => product.id === productId);

            cartProduct.quantity--;

        },
        deleteFromCart: (state, {productId,token}) => {

            //find the product index in the cart list
            let cartProductIndex = state.carts.findIndex((product) => product.id === productId);
            // remove the product from the cart
            state.carts.splice(cartProductIndex, 1);
            cartService.deleteCartItem(productId,token).then(res=>{
                console.log("message delete cart",res)
            })

        },
        showToast: (state, toastText) => {
            state.toast.show = true;
            state.toast.text = toastText;
        },
        hideToast: (state) => {
            state.toast.show = false;
            state.toast.text = "";
        },
        incrementQuantity: (state, payload) => {
            const {productId,token} = payload;

            let index = state.carts.findIndex((product) => product.id === productId)
            if(state.carts[index].quantity>1){

                state.carts[index].quantity--;
                let object = {
                    product_id: productId,
                    quantity:state.carts[index].quantity,

                }
                console.log("incrementQuantity",object)
                cartService.postCartItem(object,token).then(res=>{
                    console.log("message incrementQuantity cart",res)
                })

            }


        },
        decrementQuantity: (state, payload) => {
            const {productId,token} = payload;
            let index = state.carts.findIndex((product) => product.id === productId)
            state.carts[index].quantity++;
            let object = {
                product_id: productId,
                quantity:state.carts[index].quantity,

            }
            cartService.postCartItem(object,token).then(res=>{
                console.log("message decrementQuantity cart",res)
            })
        },
        getCartItems:(state,payload)=>{
            state.carts = payload.data
        },
        updateCart:(state,payload)=>{

            state.carts = payload
        }

    },
    actions: {

        fetchProducts: ({ commit }) => {
            //simulating a fake ajax request to fetch products from database
            productService.getProducts().then((products) => {
                //passing the products recieved from response as a payload to the mutation
                commit("setUpProducts", products);
                commit("showToast", "products loaded");
            });
        },
        addToCart: ({ commit ,rootState}, productId) => {
            productService.products("add", productId).then((product) => {
                 let payload = {
                    ...product,token:rootState.user.token
                }

                commit("addToCart", payload);
                commit("showToast", "Add to cart");

            });
        },
        removeFromCart: ({ commit }, productId) => {
            productService.products("remove", productId).then((productId) => {
                commit("removeFromCart", productId);
                commit("showToast", "removed from cart");
            });
        },
        deleteFromCart: ({ commit,rootState}, productId) => {
            productService.products("delete", productId).then((productId) => {
                let payload = {
                    productId:productId,token:rootState.user.token
                }
                commit("deleteFromCart", payload);
                commit("showToast", "deleted from cart");
            });

        },
        incrementQuantity: ({ commit,rootState }, productId) => {

            let payload = {
                productId:productId,token:rootState.user.token
            }

            commit("incrementQuantity", payload);
        },
        decrementQuantity: ({ commit,rootState }, productId) => {
            let payload = {
                productId:productId,token:rootState.user.token
            }
            commit("decrementQuantity", payload);
        },
        getAllCarts: ({ commit,rootState}) => {
            cartService.getCartItems(rootState.user.token).then(res=>{
                console.log("all carts",res.data)
                commit("getCartItems", res.data);
            })

        },
        updateCart: ({ commit,rootState}, data) => {
            commit("updateCart", data);
        },
        toast: ({ commit }, toastText) => {

            commit("showToast", toastText);
        }

    }
}


