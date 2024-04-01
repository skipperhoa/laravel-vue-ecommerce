<template>
    <div style="background-color: rgba(0, 0, 0, 0)">
        <div
            v-if="product != null"
            class="container px-5 py-24 mx-auto"
            style="cursor: auto"
        >
            <div class="lg:w-4/5 mx-auto flex flex-wrap">
                <div class="lg:w-1/2 item" >
                    <img
                        alt="ecommerce"
                        class="w-full lg:h-auto h-64 object-cover object-center rounded item-img-cart"
                        :src="product.thumbnail"
                        style="cursor: auto"
                    />
                    <div class="w-full flex flex-row gap-2">
                        <div
                            class="w-20 border-[1px] py-1 px-2 mt-2 rounded-sm"
                            v-for="(image, index) in product.images"
                            :key="index"
                        >
                            <img
                                :src="image"
                                class="w-full max-w-20 h-auto rounded-sm"
                            />
                        </div>
                    </div>

                </div>

                <div
                    class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0"
                    style="cursor: auto"
                >
                    <h2
                        class="text-sm title-font text-gray-500 tracking-widest"
                        style="cursor: auto"
                    >
                        ON SALE
                    </h2>
                    <h1
                        class="text-gray-900 text-3xl title-font font-medium mb-1"
                        style="cursor: auto"
                    >
                        {{ product.title }}
                    </h1>
                    <div class="flex mb-4">
                        <span class="flex items-center">
                            <svg
                                fill="currentColor"
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                class="w-4 h-4 text-indigo-500"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                                ></path>
                            </svg>
                            <svg
                                fill="currentColor"
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                class="w-4 h-4 text-indigo-500"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                                ></path>
                            </svg>
                            <svg
                                fill="currentColor"
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                class="w-4 h-4 text-indigo-500"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                                ></path>
                            </svg>
                            <svg
                                fill="currentColor"
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                class="w-4 h-4 text-indigo-500"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                                ></path>
                            </svg>
                            <svg
                                fill="none"
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                class="w-4 h-4 text-indigo-500"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                                ></path>
                            </svg>
                            <span class="text-gray-600 ml-3"
                                >{{ product.rating }} Rating</span
                            >
                        </span>
                        <span
                            class="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s"
                        >
                            <a class="text-gray-500">
                                <svg
                                    fill="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    class="w-5 h-5"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"
                                    ></path>
                                </svg>
                            </a>
                            <a class="text-gray-500">
                                <svg
                                    fill="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    class="w-5 h-5"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"
                                    ></path>
                                </svg>
                            </a>
                            <a class="text-gray-500">
                                <svg
                                    fill="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    class="w-5 h-5"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"
                                    ></path>
                                </svg>
                            </a>
                        </span>
                    </div>
                    <p class="leading-relaxed">{{ product.description }}</p>
                    <div
                        class="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5"
                    >
                        <div class="flex">
                            <span class="mr-3">Color</span>
                            <button
                                class="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"
                            ></button>
                            <button
                                class="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"
                            ></button>
                            <button
                                class="border-2 border-gray-300 ml-1 bg-indigo-500 rounded-full w-6 h-6 focus:outline-none"
                            ></button>
                        </div>
                        <div class="flex ml-6 items-center">
                            <span class="mr-3">Size</span>
                            <div class="relative">
                                <select
                                    class="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10"
                                >
                                    <option>SM</option>
                                    <option>M</option>
                                    <option>L</option>
                                    <option>XL</option>
                                </select>
                                <span
                                    class="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center"
                                >
                                    <svg
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        class="w-4 h-4"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M6 9l6 6 6-6"></path>
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="flex">
                        <span
                            class="title-font font-medium text-2xl text-gray-900"
                            >${{ product.price }}</span
                        >
                        <!--  <button @click="sentToCart(product.id)" id="sendtocart" class="flex ml-auto relative text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                            <span :class="check_add?'cart-item':''" class="bg-gray-200 rounded-full w-[25px] h-[25px] p-1 title-font block text-green-500  absolute top-[-10px] right-[-6px]">1</span>
                            Buy
                        </button> -->



                            <button
                                @click="addToCart2($event,product)"
                                id="sendtocart"
                                class="flex ml-auto relative text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                            >
                                <span
                                    :class="check_add ? 'cart-item' : ''"
                                    class="bg-gray-200 rounded-full w-[25px] h-[25px] p-1 title-font block text-green-500 absolute top-[-10px] right-[-6px]"
                                    >1</span
                                >
                                ADD CART
                            </button>
                            <button class="flex ml-auto relative text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                                <span>BUY</span>
                            </button>

                        <button
                            class="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4"
                        >
                            <svg
                                fill="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                class="w-5 h-5"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
                                ></path>
                            </svg>
                        </button>
                    </div>
                    <div class="feeld">
                        <!-- <feeling></feeling> -->
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="p-5">
            <h1 class="text-center py-3 text-red-500">Product not found</h1>
        </div>
    </div>
</template>

<script>
import { mapActions,mapState } from "vuex";
import Feeling from "../components/Feeling.vue";
import { productService } from "../_services/index";

export default {
    components: {
        Feeling,
    },
    data() {
        return {
            count: 2,
            id: this.$route.params.id,
            product: null,
            check_add: false,
        };
    },
    computed:{
       ...mapState({
            isLogin:(state)=>state.user.isLogin
       })
    },

    created() {
        productService
            .getProductsWithId("get_product_id", this.$route.params.id)
            .then((product) => {
                console.log("Detail v2",product);
                this.product = product;
            });
    },
    methods: {
        ...mapActions({
            addToCart: "cart/addToCart",
        }),
        sentToCart(product) {

            this.addToCart(product);

        },
        addToCart2(event,id) {
            if(!this.isLogin){
                return this.$router.push({name :"login"})
            }
            const cart = document.querySelector(".shopping-cart");
            /* const imgtodrag = event.currentTarget
                .closest(".item")
                .querySelector("img"); */
              /*   const imgtodrag = event.currentTarget.querySelector("span");
 */
            const imgtodrag = document.querySelector(".item-img-cart");

            if (imgtodrag) {
                const imgclone = imgtodrag.cloneNode(true);
                 imgclone.style.cssText =
                    "opacity: 0.5; position: absolute; height: 60px; width: 60px;border-radius:10px; z-index: 100;";
                document.body.appendChild(imgclone);

                const rect = cart.getBoundingClientRect();

                const startX = imgtodrag.getBoundingClientRect().left;
                const startY = imgtodrag.getBoundingClientRect().top;
                console.log(startX, startY);

                const endX = rect.left + window.scrollX + 10;
                const endY = rect.top + window.scrollY + 10;

                const dx = endX - startX;
                const dy = endY - startY;

                const duration = 1000;
                const startTime = performance.now();

                const animate = (currentTime) => {
                        const elapsedTime = currentTime - startTime;
                        const progress = Math.min(elapsedTime / duration, 1);
                        imgclone.style.left = `${startX + progress * dx}px`;
                        imgclone.style.top = `${startY + progress * dy}px`;

                        if (progress < 1) {
                            requestAnimationFrame(animate);
                        } else {
                            cart.classList.add("shake-cart");
                            setTimeout(() => {
                                cart.classList.remove("shake-cart");
                            }, 200);
                            document.body.removeChild(imgclone);
                            this.addToCart(id);
                            setTimeout(() => {
                                this.$store.commit('cart/hideToast');
                            }, 1500);

                        }
                    };

                    requestAnimationFrame(animate);


            }
        },
    },
};
</script>
