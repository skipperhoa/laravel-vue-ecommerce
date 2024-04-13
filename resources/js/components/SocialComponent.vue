<template>
    <div class="w-full">
                <router-link :to="{name:'PhoneComponent'}" href="#" class="flex items-center justify-center px-4 py-2 mt-2 space-x-2 transition-colors duration-300 border border-gray-300 rounded-md group hover:bg-blue-500 focus:outline-none">
                  <img src="../assets/images/phone.png" class="w-5 h-5 block"/>
                  <span class="text-sm font-medium text-black group-hover:text-white">Phone</span>
                </router-link>
                <button @click="onFacebook" class="w-full flex items-center justify-center px-4 py-2 mt-2 space-x-2 transition-colors duration-300 border border-gray-300 rounded-md group hover:bg-blue-500 focus:outline-none">
                  <img src="../assets/images/facebook.png" class="w-5 h-5 block"/>
                  <span class="text-sm font-medium text-black group-hover:text-white">Facebook</span>
                </button>
                <button class="w-full flex items-center justify-center px-4 py-2 mt-2 space-x-2 transition-colors duration-300 border border-gray-300 rounded-md group hover:bg-blue-500 focus:outline-none">
                  <img src="../assets/images/twitter.png" class="w-5 h-5 block"/>
                  <span class="text-sm font-medium text-black group-hover:text-white">Twitter</span>
                </button>
                <button  @click="onGoogle" class="w-full flex items-center justify-center px-4 py-2 mt-2 space-x-2 transition-colors duration-300 border border-gray-300 rounded-md group hover:bg-blue-500 focus:outline-none">
                  <img src="../assets/images/google.png" class="w-5 h-5 block"/>
                  <span class="text-sm font-medium text-black group-hover:text-white">Google</span>
                </button>
                <button @click="onGithub" class="w-full flex items-center justify-center px-4 py-2 mt-2 space-x-2 transition-colors duration-300 border border-gray-300 rounded-md group hover:bg-blue-500 focus:outline-none">
                  <img src="../assets/images/github.png" class="w-5 h-5 block"/>
                  <span class="text-sm font-medium text-black group-hover:text-white">Github</span>
                </button>

    </div>
</template>
<script>

import {auth} from '../firebase/init';
import {getAuth,signInWithPhoneNumber,GithubAuthProvider,createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,GoogleAuthProvider, signInWithPopup,FacebookAuthProvider,RecaptchaVerifier} from 'firebase/auth'

  import { ref,computed } from 'vue'
  import { useStore } from 'vuex'
  import { useRouter } from 'vue-router'
  import { userService } from '../_services';

  export default {
    name: "RegisterComponent",
   setup() {
      const name = ref('')
      const email = ref('')
      const verificationCode = ref('')
      const password = ref('')
      const error = ref(null)

      const store = useStore()
      const router = useRouter()
      const loggedIn = computed(() => store.state.user.isLogin);
      const userData = computed(() => store.state.user._user);
      const errorSocial = computed(() => store.state.user.error);
      const Register = async () => {
        try {
          await store.dispatch('firebase/register', {
            email: email.value,
            password: password.value,
            name: name.value
          })

        }
        catch (err) {
          error.value = err.message
              }
      }
      const onGoogle = async () => {
        try {
            await store.dispatch('firebase/loginWithGoogle')
            if (loggedIn.value) {
                 //anh KAKAconsole.log("chay 4",userData.value)
                 console.log("Người dùng đã đăng nhập thành công");
                 router.push({ name: 'message' });

            } else {
                console.log("Đăng nhập không thành công");

            }

        }
        catch (err) {
          error.value = err.message
        }
      }
      const onFacebook = async () => {
        try {
          await store.dispatch('firebase/loginWithFacebook')
          if (store.getters.isLogin) {
            router.push({ name: 'message' });
          }

        }
        catch (err) {
          error.value = err.message
        }
      }
      const onGithub = async () => {
        try {
          await store.dispatch('firebase/loginWithGithub')
          if (loggedIn.value) {
            router.push({ name: 'message' });
          }else{
             if(errorSocial.value.isError){
               setTimeout(() => {
                alert(errorSocial.value.message)
               },1500)
             }
          }


        }
        catch (err) {
          error.value = err.message

        }
       /*  try {
            const provider = new GithubAuthProvider();
            const auth = getAuth();
                signInWithPopup(auth, provider)
                .then((result) => {
                    // This gives you a GitHub Access Token. You can use it to access the GitHub API.
                    const credential = GithubAuthProvider.credentialFromResult(result);
                    const token = credential.accessToken;

                    // The signed-in user info.
                    const user = result.user;
                    // IdP data available using getAdditionalUserInfo(result)
                    console.log("USER GITHUB",user);
                    // ...
                }).catch((error) => {
                    // Handle Errors here.
                    const errorCode = error.code;

                    const errorMessage = error.message;
                    // The email of the user's account used.
                    const email = error.customData.email;
                    console.log("GITHUB",email)
                    // The AuthCredential type that was used.
                    const credential = GithubAuthProvider.credentialFromError(error);
                    // ...
                });

        }
        catch (err) {
          error.value = err.message
        } */
      }


      return { Register, name,email, password, verificationCode,error,onGoogle,onFacebook,onGithub}
    }
  };
  </script>
