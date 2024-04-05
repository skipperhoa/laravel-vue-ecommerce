<template>
    <div class="container mx-auto">
      <div class="flex justify-center">
        <div class="w-full md:w-8/12">
          <div class="bg-white shadow-md rounded-lg">
            <div class="bg-gray-200 px-4 py-2 rounded-t-lg">
              Register
            </div>
            <div class="p-4">
              <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-2 mb-4 rounded">
                {{ error }}
              </div>
              <form @submit.prevent="Register">
                <div class="mb-4">
                  <label for="name" class="block text-gray-700 text-sm font-bold mb-2">Name</label>
                  <input
                    id="name"
                    type="name"
                    class="form-input w-full border-2 border-gray-500"
                    name="name"
                    v-model="name"
                    required
                    autofocus
                  />
                </div>

                <div class="mb-4">
                  <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Email</label>
                  <input
                    id="email"
                    type="email"
                    class="form-input w-full border-2 border-gray-500"
                    name="email"
                    v-model="email"
                    required
                  />
                </div>

                <div class="mb-4">
                  <label for="password" class="block text-gray-700 text-sm font-bold mb-2">Password</label>
                  <input
                    id="password"
                    type="password"
                    class="form-input w-full border-2 border-gray-500"
                    name="password"

                    v-model="password"
                    required
                  />
                </div>

                <div class="flex items-center justify-between">
                  <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Register
                  </button>
                </div>
              </form>
              <div class="form-social">
                 <button @click="onGoogle" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Login Google</button>
                 <button @click="onFacebook" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Login Facebook</button>
                  <button @click="onPhoneNumber('+84975595084')" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Login Phone</button>
                  <div id="recaptcha-container"></div>
                  <input type="text" id="verification-code" name="verificationCode" v-model="verificationCode" placeholder="Enter verification code">
                  <button @click="confirmOpt">Submit</button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>


  <script>

import {auth} from '../../firebase/init';
import {getAuth,signInWithPhoneNumber,createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,GoogleAuthProvider, signInWithPopup,FacebookAuthProvider,RecaptchaVerifier} from 'firebase/auth'

  import { ref } from 'vue'
  import { useStore } from 'vuex'
  import { useRouter } from 'vue-router'

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
          //router.push({name: 'message'})
        }
        catch (err) {
          error.value = err.message
        }
      }
      const onFacebook = async () => {
        try {
          await store.dispatch('firebase/loginWithFacebook')
          //router.push({name: 'message'})
        }
        catch (err) {
          error.value = err.message
        }
      }

      const onPhoneNumber =  (phoneNumber) => {
            try {
                const recaptchaContainer = document.getElementById('recaptcha-container');
                const recaptchaVerifier = new RecaptchaVerifier(auth,recaptchaContainer, {
                'size': 'invisible',
                'callback': (response) => {
                    // reCAPTCHA solved, allow signInWithPhoneNumber
                    console.log('reCAPTCHA solved');
                },
                'expired-callback': () => {
                    // reCAPTCHA expired, reset reCAPTCHA and retry
                    console.log('reCAPTCHA expired');
                    recaptchaVerifier.render().then((widgetId) => {
                    recaptchaVerifier.reset(widgetId);
                    });
                }
                });

                signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier)
                    .then((confirmationResult) => {
                                // SMS sent. Prompt user to type the code from the message, then sign the
                                // user in with confirmationResult.confirm(code).
                                window.confirmationResult = confirmationResult;
                                // ...
                                }).catch((error) => {
                                // Error; SMS not sent
                                // ...
                });
            } catch (error) {
                console.error('Error signing in with phone number:', error);
            }
            };

             const confirmOpt= ()=>{
                 console.log(verificationCode.value)
                    window.confirmationResult.confirm(verificationCode.value).then((result) => {
                    // User signed in successfully.
                    const user = result.user;
                    console.log(user)
                    // ...
                    }).catch((error) => {
                    // User couldn't sign in (bad verification code?)
                    console.log(error)
                    });

            }

      return { Register, name,email, password, verificationCode,error,onGoogle,onFacebook , onPhoneNumber,confirmOpt}
    }
  };
  </script>
