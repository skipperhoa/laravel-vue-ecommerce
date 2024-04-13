<template>
<div class="flex items-center min-h-screen p-4 justify-center">
      <div class="w-full max-w-xl  overflow-hidden rounded-md p-10">
        <div class="w-full">
            <img src="../assets/images/avatar.jpg" class="w-20 h-20 m-auto block rounded-full" />
            <h3 class="my-4 text-xl text-center font-semibold text-gray-700">Hòa Nguyễn Coder</h3>
            <form action="" class="flex flex-col space-y-5" @submit.prevent="login">
              <div class="flex flex-col space-y-1">
                <label for="email" class="text-sm font-semibold text-gray-800">Email address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  v-model="email"
                  @blur="validateEmail"
                  autofocus
                  class="px-4 py-1 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                />
                <p v-if="emailError" class="text-xs italic text-red-500">Enter email for you</p>
              </div>
              <div class="flex flex-col space-y-1">
                <div class="flex items-center justify-between">
                  <label for="password" class="text-sm font-semibold text-gray-800">Password</label>
                  <a href="#" class="text-sm text-blue-600 hover:underline focus:text-blue-800">Forgot your password?</a>
                </div>
                <input
                  type="password" name="password"
                  id="password" v-model="password" @blur="validatePassword"
                  class="px-4 py-1 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                />
                <p v-if="passwordError" class="text-xs italic text-red-500">Abc@1234 có độ dài là 8 ký tự, nằm trong khoảng tự 7 đến 15 ký tự.</p>
              </div>
              <div class="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remember" name="remember_me" v-model="remember_me"
                  class="w-4 h-4 transition duration-300 rounded focus:ring-2 focus:ring-offset-0 focus:outline-none focus:ring-blue-200"
                />
                <label for="remember" class="text-sm font-semibold text-gray-500">Remember me</label>
              </div>
              <div>
                <button
                  type="submit"
                  class="w-full px-4 py-2 text-sm text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
                >
                  Sign in
                </button>
                <div>
                    <p class="text-xm py-2">
                        By signing in you accept the <small class="text-blue-500 text-sm">Terms of Use and acknowledge the Privacy Statement and Cookie Policy.</small>

                    </p>
                    <p class="text-sm text-center">Don't have an account yet? <router-link to="/register" class="text-sm font-semibold">Register now</router-link></p>
                </div>
              </div>

            </form>
        </div>
        <div class="w-full flex flex-row justify-center items-center py-2">
            <hr class="w-40 border-gray-200 h-[1px]">
           <p class="px-2 text-sm">or sign in with</p>
            <hr class="w-40 border-gray-200 h-[1px]">
        </div>
        <div class="w-full">
          <div class="w-full">
            <SocialComponent></SocialComponent>
            </div>
        </div>
      </div>
    </div>
</template>
<script>
import {mapActions,mapGetters} from 'vuex'
import {userService} from "../_services"
import SocialComponent from '../components/SocialComponent.vue'
export default{
    name: "Login",
    components:{
        SocialComponent
    },
    data(){
        return {
            email: '',
            password: '',
            remember_me:false,
            emailError: false,
            passwordError: false
        }
    },
    computed:{
        ...mapGetters({
            isLogin: 'user/isLogin',
            redirectedFrom: 'history/getRedirectedFrom'
        })
    },
    mounted(){
        console.log("Full Path",this.redirectedFrom);
    },
    methods:{
        ...mapActions({
            onLogin: 'user/onLogin'
        }),

        validateEmail(email) {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)) {
                this.emailError  = false;
            } else {
                this.emailError = true;
            }
        },
        validatePassword:function(password) {
            let paswd=  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
            if(paswd.test(this.password)) this.passwordError = false;
            else this.passwordError = true;
        },
        login:function(){
            if(!this.emailError && !this.passwordError){
                let data = {
                    email: this.email,
                    password: this.password,
                    remember_me:this.remember_me
                };


                //alert("Login success"+JSON.stringify(data));
                this.onLogin(data)
                setTimeout(() => {
                    if(this.isLogin){
                        if(this.redirectedFrom!=null){
                            this.$router.push(this.redirectedFrom)
                        }else{
                            this.$router.push({name: 'products'})
                        }

                    }

                },1000);


            }
        }
    }
}

</script>
