<template>
    <div class="bg-gray-100 py-2">
        <div class="container mx-auto">
            <div class="flex shadow-md my-10">
                <div class="w-2/4 bg-white px-10 py-10">
                    <div class="flex justify-between border-b pb-8">
                        <h1 class="font-semibold text-2xl">Shopping Cart</h1>
                        <h2 class="font-semibold text-2xl">{{ cartSize }} Items</h2>
                    </div>
                    <div class="flex mt-10 mb-5">
                        <h3 class="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
                        <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Quantity</h3>
                        <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Price</h3>
                        <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Total</h3>
                    </div>
                    <!-- for carts -->
                    <div class="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5" v-for="cart in carts">
                        <div class="flex w-2/5"> <!-- product -->
                            <div class="w-20">
                                <img class="h-24" :src="cart.thumbnail" alt="">
                            </div>
                            <div class="flex flex-col justify-between ml-4 flex-grow">
                                <span class="font-bold text-sm">{{ cart.title }}</span>
                                <span class="text-red-500 text-xs">{{ cart.brand }}</span>
                                <a href="#" @click="deleteFromCart(cart.id)" class="font-semibold hover:text-red-500 text-gray-500 text-xs">Remove</a>
                            </div>
                        </div>
                        <div class="flex justify-center w-1/5">
                            <svg class="fill-current text-gray-600 w-3" viewBox="0 0 448 512" @click="incrementQuantity(cart.id)">
                                <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                            </svg>

                            <input class="mx-2 border text-center w-8" type="text" v-bind:value=cart.quantity>

                            <svg class="fill-current text-gray-600 w-3" viewBox="0 0 448 512" @click="decrementQuantity(cart.id)">
                                <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                            </svg>
                        </div>
                        <span class="text-center w-1/5 font-semibold text-sm">${{ cart.price }}</span>
                        <span class="text-center w-1/5 font-semibold text-sm">${{cart.quantity* cart.price}}</span>
                    </div>

                    <!-- end for -->

                    <router-link to='/' href="#" class="flex font-semibold text-indigo-600 text-sm mt-10">

                        <svg class="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512">
                            <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
                        </svg>
                        Continue Shopping
                    </router-link>
                </div>

                <div id="summary" class="w-2/4 px-8 py-2">
                    <!-- <h1 class="font-semibold text-2xl border-b pb-8">Choose Shippper and Promotion</h1> -->
                    <div class="flex justify-between mt-10 mb-5">
                        <span class="font-semibold text-sm uppercase">Total products: {{ cartSize }}</span>
                        <span class="font-semibold text-sm">{{cartTotalAmount}}$</span>
                    </div>
                    <div class="py-2">
                        <label class="font-medium inline-block mb-3 text-sm uppercase">Address</label>
                       <input type="text" name="address" v-model="address" class="block p-2 text-gray-600 w-full text-sm">
                    </div>
                    <div class="py-2">
                        <label class="font-medium inline-block mb-3 text-sm uppercase">Phone</label>
                       <input type="text" name="phone" v-model="phone" class="block p-2 text-gray-600 w-full text-sm">
                    </div>
                    <div>
                        <label class="font-medium inline-block mb-3 text-sm uppercase">Shipping</label>
                        <select class="block p-2 text-gray-600 w-full text-sm" v-if="shippers.length>0" @change="onChangeShipper($event)" v-model="selectedShipper" >
                            <option value="0">Select Shipping</option>
                            <option  v-for="shipper in shippers" :key="shipper.id" :value="shipper.id">{{ shipper.shipper_method }} ({{ shipper.estimed_delivery_time }} - {{ shipper.price }} VND)</option>
                        </select>
                    </div>
                    <div class="py-2">
                        <label for="promo" class="font-semibold inline-block mb-3 text-sm uppercase">Promo Code</label>
                        <div class="flex flex-row">
                              <input type="text" id="promo" placeholder="Enter your code" class="p-2 text-sm w-1/2" @keyup.enter="checkPromotion" v-model="promoCode">
                              <button class="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase" :disabled="promoCode.length<=0 || promoCodeDiscountRate>0" @click="checkPromotion">Apply</button>
                        </div>
                        <span class="text-xs text-green-600 w-1/2" v-if="promoCodeDiscountRate>0">Code : {{ promoCode }}, discount rate : {{ promoCodeDiscountRate }} %  <small @click="removePromoCode" class="text-red-500 font-bold">(remove)</small></span>
                        <span class="text-xs text-red-600" v-if="toastErrorMessage!=''">Code khong hop le</span>
                    </div>

                    <div class="py-2">

                    <label for="promo" class="font-semibold inline-block mb-3 text-sm uppercase">Payment Method</label>
                    <div class="bg-white rounded mt-4 shadow-lg">
                        <div class="flex items-center px-8 py-5">
                                <input class="appearance-none w-4 h-4 rounded-full border-2 border-white ring-2 ring-blue-600 ring-opacity-100" :class="{ 'bg-blue-600': checkedGroupVModel === 'Payment on delivery' }" id="check_cart1" value="Payment on delivery" name="vModelGroup" type="radio" v-model="checkedGroupVModel">
                                <label class="text-sm font-medium ml-4">Payment on delivery</label>
                        </div>
                        <div class="flex items-center px-8 py-5">
                                <input class="appearance-none w-4 h-4 rounded-full border-2 border-white ring-2 ring-blue-600 ring-opacity-100" :class="{ 'bg-blue-600': checkedGroupVModel === 'PayPal' }" id="check_cart1" value="PayPal"  name="vModelGroup" type="radio" v-model="checkedGroupVModel">
                                <label class="text-sm font-medium ml-4">PayPal</label>
                        </div>
                        <div class="border-t">
                            <div class="flex items-center px-8 py-5">
                                <input class="appearance-none w-4 h-4 rounded-full border-2 border-white ring-2 ring-blue-600 ring-opacity-100" :class="{ 'bg-blue-600': checkedGroupVModel === 'Credit Card' }" id="check_cart2" value="Credit Card" name="vModelGroup" type="radio" v-model="checkedGroupVModel">
                                <label class="text-sm font-medium ml-4">Credit Card</label>
                            </div>
                            <div class="grid grid-cols-2 gap-4 px-8 pb-8">
                                <div class="col-span-2">
                                    <label class="text-xs font-semibold" for="cardNumber">Card number</label>
                                    <input class="flex items-center h-10 border mt-1 rounded px-4 w-full text-sm" type="text" placeholder="0000 0000 0000 0000">
                                </div>
                                <div class="">
                                    <label class="text-xs font-semibold" for="cardNumber">Expiry Date</label>
                                    <input class="flex items-center h-10 border mt-1 rounded px-4 w-full text-sm" type="text" placeholder="MM/YY">
                                </div>
                                <div class="">
                                    <label class="text-xs font-semibold" for="cardNumber">CVC/CVV</label>
                                    <input class="flex items-center h-10 border mt-1 rounded px-4 w-full text-sm" type="password" placeholder="...">
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                    <div class="border-t mt-8 pb-2">
                        <div class="flex font-semibold justify-between py-6 text-sm uppercase">
                            <span>Total cost</span>
                            <span>${{ finalPrice(cartTotalAmount) }}</span>
                        </div>
                        <button  @click="checkOut" v-if="isSubmitPayment && cartSize>0" class="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full px-2">Check Out</button>
                    </div>
                </div>

            </div>
        </div>
    </div>

</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import { shipperService , promotionService, orderService} from '../_services';
export default {
    data() {
        return{
            shipperFee: 0, // Phí shipper
            promoCodeDiscountRate:0,//mã giảm giá
            shippers:[],
            promoCode:"",
            toastErrorMessage:"",
            selectedShipper:2,
            isSubmitPayment:false,
            checkedGroupVModel:'Payment on delivery',
            address:"",
            phone:""
        }

    },
    computed: {
        ...mapState({
           _carts: state => state.cart.carts,
           token: state=>state.user.token
        }),
        ...mapGetters({
            cartSize:'cart/cartSize',
            cartTotalAmount:'cart/cartTotalAmount'

    }),
        carts() {
            return this.$store.state.cart.carts
        }
    },
    created() {
        console.log("carts2",this._carts);

    },
    mounted() {
        this.getAllShippers(),
        this.checkPayment()
    },
    watch: {
        selectedShipper: function (newValue, oldValue) {
            if (newValue!=0) { // Nếu giá trị mới là true và giá trị cũ là false
                this.checkPayment();
            }else{
                this.isSubmitPayment = false
            }
        }
    },
    methods: {
        ...mapActions({
            incrementQuantity:'cart/incrementQuantity',
            decrementQuantity:'cart/decrementQuantity',
            deleteFromCart:'cart/deleteFromCart',
            updateCart:'cart/updateCart',
            toast:'cart/toast'
        }),
        discount(total) {
             return (total * this.promoCodeDiscountRate) / 100;
        },
        // Tính toán giá tiền cuối cùng sau khi áp dụng mã giảm giá
        finalPrice(total) {
            let _discount = this.discount(total);
            return total + this.shipperFee - _discount;
        },
        getAllShippers() {
            shipperService.getAll().then(res => {
                this.shippers = res.data
            })
        },
        //check promotion
        checkPromotion() {
            if(this.promoCode.length>0 && this.promoCodeDiscountRate>0){
                return;
            }
            let self = this; // Lưu giữ giá trị của `this`
            promotionService.getPromotion(this.promoCode,this.token).then(res => {
                if(res.data?.code){
                    this.promoCodeDiscountRate = parseInt(res.data.discount_percentage)
                    self.toastErrorMessage = ""
                }
            }).catch(function (error) {
                if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                   // console.log(error.response.data);
                    //console.log(error.response.status);
                    //console.log(error.response.headers);
                    if(error.response.data.message==='Promotion not found' && error.response.status===404){
                        let msg = error.response.data.message;

                        self.toastErrorMessage = msg
                    }
                } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
                } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
                }
                console.log(error.config);
            });
        },
        removePromoCode(){
            this.promoCode = "",
            this.promoCodeDiscountRate=0;
        },
        onChangeShipper(event) {
            //console.log(event.target.value)
            if(event.target.value>0){
                shipperService.getShipperID(event.target.value).then(res => {
                    this.shipperFee = parseInt(res.data.price)
                })
            }

        },
        checkPayment(){
            if(this.selectedShipper>0 && this.cartSize>0){
                this.isSubmitPayment = true
            }
        },
        checkOut(){
            let _carts = this._carts
            let data = {
                carts:JSON.stringify(_carts),
                shipper_id:this.selectedShipper,
                payment_method:this.checkedGroupVModel,
                address:this.address,
                phone:this.phone,
                promotion_code:this.promoCode,
                total_price:this.finalPrice(this.cartTotalAmount)
            }
            orderService.checkOut(data,this.token).then(res=>{
                if(res.data.status===1){
                   //remove cart in store
                   this.updateCart([])
                   this.toast({message:"Check out success"})
                   setTimeout(() => {
                                this.$store.commit('cart/hideToast');
                                this.$router.push({path:"/"})
                            }, 1500);
                }
            })
        }

    }
}
</script>
