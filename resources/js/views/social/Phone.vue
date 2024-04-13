<template>
    <div class="flex items-center min-h-screen p-4 m-auto">
      <div class="w-full max-w-xl m-auto overflow-hidden rounded-md p-10">
        <div class="w-full">
          <img src="@/assets/images/avatar.jpg" alt="Logo" class="w-20 h-20 rounded-full mx-auto block" />
          <h3 class="my-4 text-xl text-center font-semibold text-gray-700">Hòa Nguyễn Coder</h3>
          <div v-if="!isSubmitPhone" class="flex flex-col space-y-5">
            <div class="flex flex-col space-y-1">
              <div class="flex flex-row">
                <select v-model="selectedCountryCode" class="w-auto mr-2 px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200">
                  <option value="+84">+84</option>
                  <option value="+1">+1</option>
                </select>
                <input type="tel" id="phone" name="phone" v-model="phone" @blur="validatePhoneNumber" class="w-full px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200" placeholder="Enter your phone number" />
              </div>
            </div>
            <button @click="onPhoneNumber" type="submit" class="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-green-500 rounded-md shadow hover:bg-green-600 focus:outline-none focus:ring-blue-200 focus:ring-4">
                Send Verification Code
            </button>

          </div>

          <div v-else>

            <div class="my-2">
              <input type="text" v-model="verificationCode" placeholder="Verify your phone" class="w-full px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200" />
            </div>
            <button  @click="confirmOpt" class="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-yellow-500 rounded-md shadow hover:bg-yellow-600 focus:outline-none focus:ring-blue-200 focus:ring-4">
                Verify Code
            </button>


          </div>
          <div id="recaptcha-container"></div>

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

    import {auth} from '../../firebase/init';
    import {signInWithPhoneNumber,RecaptchaVerifier} from 'firebase/auth'
    import  {userService} from '../../_services'
    import { ref } from 'vue'
    import { useStore } from 'vuex'
    import { useRouter } from 'vue-router'
    import SocialComponent from '../../components/SocialComponent.vue';
      export default {
        name: "LoginComponent",
        components: {
          SocialComponent
        },
       setup() {
          const phone = ref('')
          const isSubmitPhone = ref(false)
          const verificationCode = ref('')
          const selectedCountryCode = ref('+84')
          const dataUser = ref({})
          const error = ref(null)
          const store = useStore()
          const router = useRouter()
         console.log(store.state.user)
         const validatePhoneNumber=()=>{
              // Regular expression pattern for Vietnamese phone numbers
              const vietnamesePhoneNumberPattern = /^(0|\+?84)?\d{9,10}$/;

              // Remove all non-numeric characters except '+' from the input
              const cleanedPhoneNumber = this.phone.replace(/[^\d+]/g, '');

              // Test the input phone number against the pattern
              phone.value = vietnamesePhoneNumberPattern.test(cleanedPhoneNumber);

          }

          const onPhoneNumber =  async () => {


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
                 //   await store.dispatch('firebase/loginWithPhone',{phoneNumber:phone.value,recaptchaVerifier:recaptchaVerifier})
                    isSubmitPhone.value = true
                    //router.push({name: 'message'})
                     phone.value = selectedCountryCode.value + phone.value
                     console.log(phone.value)
                     signInWithPhoneNumber(auth, phone.value, recaptchaVerifier)
                        .then((confirmationResult) => {
                                    // SMS sent. Prompt user to type the code from the message, then sign the
                                    // user in with confirmationResult.confirm(code).
                                    window.confirmationResult = confirmationResult;
                                    isSubmitPhone.value = true
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
                        window.confirmationResult.confirm(verificationCode.value).then((result) => {
                        // User signed in successfully.
                        const user = result.user;
                        //console.log("providerData",user.providerData[0])
                        dataUser.value= user.providerData[0]
                        userService.register(dataUser.value).then(response => {
                                if(response.status == 200){
                                     store.commit('user/onLogin',response.data)
                                     store.dispatch('cart/getAllCarts',null, { root: true })
                                    setTimeout(() => {
                                        router.push({name: 'message'})
                                    },1000);

                                }

                            }).catch(error => {
                                if(error.response.status===400){
                                    alert(error.response.data.message);
                                }
                            });
                        }).catch((error) => {

                        console.log(error)
                        });

                }

          return { dataUser,phone,selectedCountryCode,isSubmitPhone, verificationCode,error, onPhoneNumber,confirmOpt,validatePhoneNumber}
        }
      };
      </script>

