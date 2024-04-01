<template>
    <div class="font-mono bg-gray-400">
        <!-- Container -->
        <div class="container mx-auto">
            <div class="flex justify-center items-center h-screen px-6">
                <!-- Row -->
                <div class="w-full xl:w-3/4 lg:w-11/12 flex">
                    <!-- Col -->
                    <div class="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg" :style="{ backgroundImage: 'url(' + image + ')' }"></div>

                    <!-- <img src="../assets/images/background.jpg" /> -->
                    <!-- Col -->
                    <div class="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
                        <h3 class="pt-4 text-2xl text-center">Create an Account! </h3>
                        <form class="px-8 pt-6 pb-8 mb-4 bg-white rounded" @submit="register">
                            <div class="mb-4">
                                <div class="mb-4 md:mr-2 md:mb-0">
                                    <label class="block mb-2 text-sm font-bold text-gray-700" for="firstName">
                                        Name
                                    </label>
                                    <input v-model="name" class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" id="firstName" type="text" placeholder="First Name" />
                                    <p v-if="name!='' && name.length<=1" class="text-xs italic text-red-500">Enter name for you</p>
                                </div>

                            </div>
                            <div class="mb-4">
                                <label class="block mb-2 text-sm font-bold text-gray-700" for="email">
                                    Email
                                </label>
                                <input v-model="email" @blur="validateEmail" class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" :class="!emailError ?'': 'border-red-500'" id="email" type="email" placeholder="Email" />
                                <p v-if="emailError" class="text-xs italic text-red-500">Enter email for you</p>
                            </div>
                            <div class="mb-4 md:flex md:justify-between">
                                <div class="mb-4 md:mr-2 md:mb-0">
                                    <label class="block mb-2 text-sm font-bold text-gray-700" for="password">
                                        Password
                                    </label>
                                    <input v-model="password" @blur="validatePassword" class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
                                    <p v-if="passwordError" class="text-xs italic text-red-500">
                                        Abc@1234 có độ dài là 8 ký tự, nằm trong khoảng từ 7 đến 15 ký tự.
Nó chứa ít nhất một chữ số (1) và ít nhất một ký tự đặc biệt (@).
Các ký tự khác trong mật khẩu đều thuộc vào tập hợp a-zA-Z0-9!@#$%^&*..</p>
                                </div>
                                <div class="md:ml-2">
                                    <label class="block mb-2 text-sm font-bold text-gray-700" for="c_password">
                                        Confirm Password
                                    </label>
                                    <input v-model="confirm_password" class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" id="c_password" type="password" placeholder="******************" />
                                    <p v-if="confirm_password!=password && !passwordError" class="text-xs italic text-red-500">Confirm password not match</p>

                                </div>
                            </div>
                            <div class="mb-6 text-center">
                                <button type="submit" class="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline">
                                    Register Account
                                </button>
                            </div>
                            <hr class="mb-6 border-t" />
                            <div class="text-center">
                                <a class="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800" href="#">
                                    Forgot Password?
                                </a>
                            </div>
                            <div class="text-center">
                                <a class="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800" href="./index.html">
                                    Already have an account? Login!
                                </a>
                            </div>
                            <div class="json" v-if="isRegister">
                                {JSON.stringify(user)}
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import {mapActions,mapState,mapGetters} from 'vuex'
import background from "../assets/images/background.jpg"
import { userService } from "../_services"
export default {
    name: 'Register',
    data() {
        return {
            image: background,
            name: '',
            email: '',
            password: '',
            confirm_password: '',
            emailError: false,
            passwordError: false,
            _token: this.token,
        }
    },
    computed:{
        ...mapState({
            user: state => state.user._user,
            token: state => state.user.token,
            isRegister: state => state.user.isRegister
        }),
        ...mapGetters({
           // getUser: 'user/getUser'
        })
    },
    mounted() {

    },
    watch: {
        _token(newValue, oldValue) {
            console.log(`Updating from ${oldValue} to ${newValue}`);

            // Do whatever makes sense now
            if (newValue === 'success') {
                this.complex = {
                deep: 'some deep object',
                };
            }
    },
  },
    methods: {
        ...mapActions({
            updateUser: 'user/updateUser',
            updateToken: 'user/updateToken',
            onRegister: 'user/onRegister'

        }),
        register: function (e) {
            e.preventDefault();
            console.log("aa",this.user);
            let user = {
                name: this.name,
                email: this.email,
                password: this.password,

            }
            userService.register(user).then(response => {
                let token = response.data.authorisation.token
                let user = response.data.user

                if(response.status == 200){
                    // alert("Register success");
                      this.updateUser(user)
                      this.updateToken(token)
                      this.onRegister(true)
                      setTimeout(() => {
                          this.$router.push({name: 'message'})
                      },1000);
                   // this.$store.dispatch('user/updateUser',user)
                    //this.$store.dispatch('user/updateToken',token)
                }

            }).catch(error => {
                //console.log("kq",error);
                if(error.response.status===400){
                    alert(error.response.data.message);
                }
            });



        },
        validEmail: function (email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },
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
        }
    },

}
</script>
