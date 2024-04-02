<template>
    <div class="bg-slate-400">

        <header class="h-20 bg-white">
            <nav class="relative px-2 py-4">

                <div class="container mx-auto flex justify-between items-center">
                    <div class="w-auto flex flex-row items-center">
                        <img src="https://100daysofcode.hoanguyenit.com/public/images/avatar.png" class="w-14 h-14 rounded-full" alt="Hoanguyenit">
                        <RouterLink to="/" class="pl-2 font-bold">Hoa Nguyễn Coder</RouterLink>
                    </div>
                    <ul class="hidden md:flex space-x-6">
                        <li><RouterLink to="/">Home</RouterLink></li>
                        <li><RouterLink to="/products">Products</RouterLink></li>
                        <li class="flex relative group">
                            <a href="#" class="mr-1">Services</a>
                            <i class="fa-solid fa-chevron-down fa-2xs pt-3"></i>
                            <!-- Submenu starts -->
                            <ul class="absolute bg-white p-3 w-52 top-6 transform scale-0 group-hover:scale-100 transition duration-150 ease-in-out origin-top shadow-lg">
                                <li class="text-sm hover:bg-slate-100 leading-8"><a href="#">Webdesign</a></li>
                                <li class="text-sm hover:bg-slate-100 leading-8"><a href="#">Digital marketing</a></li>
                                <li class="text-sm hover:bg-slate-100 leading-8"><a href="#">SEO</a></li>
                                <li class="text-sm hover:bg-slate-100 leading-8"><a href="#">Ad campaigns</a></li>
                                <li class="text-sm hover:bg-slate-100 leading-8"><a href="#">UX Design</a></li>
                            </ul>
                            <!-- Submenu ends -->
                        </li>
                        <li><RouterLink to="/">About</RouterLink></li>
                        <li><RouterLink to="/">Contact</RouterLink></li>
                    </ul>

                    <div class="flex items-center gap-2">
                        <router-link to="/carts"  role="button" class="relative flex shopping-cart">
                            <img src="../assets/images/carts.png" class="w-[30px]"/>
                            <span class="absolute right-[-5px] top-[-5px] rounded-full bg-red-600 w-4 h-4 top right p-0 m-0 text-white font-mono text-sm  leading-tight text-center">
                                <!-- {{ cart.length }} -->
                                {{ cartSize }}
                            </span>
                        </router-link>
                        <router-link v-if="!isLogin"  to="/login"class="bg-red-400 px-5 py-1 rounded-3xl hover:bg-red-500 text-white hidden md:flex" role="button">Sign In</router-link>
                        <div class="flex flex-row items-center gap-2" v-if="isLogin">
                            <span class="font-bold text-sm">Thanh Hoa</span>
                            <!-- <img src="https://100daysofcode.hoanguyenit.com/public/images/avatar.png" class="w-[40px] h-[40px] rounded-full" /> -->
                            <span @click="onLogout" class="cursor-pointer">
                                <img src="../assets/images/log-out.png" class="w-[25px]"/>
                            </span>
                        </div>

                    </div>



                    <!-- Mobile menu icon -->
                    <button id="mobile-icon" class="md:hidden">
                        <i onclick="changeIcon(this)" class="fa-solid fa-bars"></i>
                    </button>

                </div>

                <!-- Mobile menu -->
                <div class="md:hidden flex justify-center mt-3 w-full">
                    <div id="mobile-menu" class="mobile-menu absolute top-23 w-full"> <!-- add hidden here later -->
                        <ul class="bg-gray-100 shadow-lg leading-9 font-bold h-screen">
                            <li class="border-b-2 border-white hover:bg-red-400 hover:text-white pl-4"><a href="https://google.com" class="block pl-7">Home</a></li>
                            <li class="border-b-2 border-white hover:bg-red-400 hover:text-white pl-4"><a href="#" class="block pl-7">News</a></li>
                            <li class="border-b-2 border-white hover:bg-red-400 hover:text-white">
                                <a href="#" class="block pl-11">Services <i class="fa-solid fa-chevron-down fa-2xs pt-4"></i></a>

                                <!-- Submenu starts -->
                                <ul class="bg-white text-gray-800 w-full">
                                    <li class="text-sm leading-8 font-normal hover:bg-slate-200"><a class="block pl-16" href="#">Webdesign</a></li>
                                    <li class="text-sm leading-8 font-normal hover:bg-slate-200"><a class="block pl-16" href="#">Digital marketing</a></li>
                                    <li class="text-sm leading-8 font-normal hover:bg-slate-200"><a class="block pl-16" href="#">SEO</a></li>
                                    <li class="text-sm leading-8 font-normal hover:bg-slate-200"><a class="block pl-16" href="#">Ad campaigns</a></li>
                                    <li class="text-sm leading-8 font-normal hover:bg-slate-200"><a class="block pl-16" href="#">UX Design</a></li>
                                </ul>
                                <!-- Submenu ends -->
                            </li>
                            <li class="border-b-2 border-white hover:bg-red-400 hover:text-white pl-4"><a href="#" class="block pl-7">About</a></li>
                            <li class="border-b-2 border-white hover:bg-red-400 hover:text-white pl-4"><a href="#" class="block pl-7">Contact</a></li>
                        </ul>
                    </div>
                </div>

            </nav>

        </header>

    </div>
</template>

<script>
import { RouterLink } from 'vue-router';
import { mapState, mapActions ,mapGetters} from 'vuex'
export default {
    computed: {
        ...mapState({
            cart: state => state.cart.carts,
            user: state => state.user._user,
            token: state => state.user.token,
            isLogin: state => state.user.isLogin

        }),
        ...mapGetters({
            cartSize:"cart/cartSize",
            cartTotalAmount:"cart/cartTotalAmount"
        })
    },
    created(){
        this.ac()
    },
    watch: {
        isLogin(newValue) {
            if (!newValue) {
                this.$router.push({name: 'login'})
            }
        }
    },
    methods: {
         ...mapActions({
            logout: "user/logout",
         }),
        onLogout(){
            this.logout(this.token);
        },
        ac(){
            console.log(this.cartSize)
        }
    }
}
</script>
