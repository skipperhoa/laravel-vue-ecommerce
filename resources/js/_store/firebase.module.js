import { createStore } from 'vuex'
import { auth } from '../firebase/init'
import { userService } from '../_services'
import {signInWithPhoneNumber,createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,GoogleAuthProvider, signInWithPopup,FacebookAuthProvider} from 'firebase/auth'

export default{
  namespaced: true,
  state: {
        user: {
            loggedIn: false,
            data: null
          }
  },

  getters: {
    user(state){
      return state.user
    }
  },
  mutations: {
    SET_USER(state, payload) {
      state.user.data = payload
    },
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    }
  },
  actions: {
      async register(context, { email, password, name}){
          const response = await createUserWithEmailAndPassword(auth, email, password)
          if (response) {
            console.log("response firebase",response)
              context.commit('SET_USER', response.user)
              response.user.updateProfile({displayName: name})
          } else {
              throw new Error('Unable to register user')
          }
      },

      async logIn(context, { email, password }){
        const response = await signInWithEmailAndPassword(auth, email, password)
        if (response) {
            context.commit('SET_USER', response.user)
        } else {
            throw new Error('login failed')
        }
    },

    async logOut(context){
        await signOut(auth)
        context.commit('SET_USER', null)
    },

    async loginWithGoogle({commit,rootState, dispatch}) {
        const provider = new GoogleAuthProvider()

        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user.providerData[0]
                console.log("onGoogle",user)
                userService.register(user).then(response => {
                        if(response.status == 200){

                            commit('user/onLogin',response.data, { root: true })
                        }

                    }).catch(error => {
                        if(error.response.status===400){
                           // alert(error.response.data.message);
                        }
            });



            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;


            });
    },
    async loginWithFacebook(context){
        const provider = new FacebookAuthProvider()
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                const credential = FacebookAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                console.log("onFacebook",user)
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = FacebookAuthProvider.credentialFromError(error);
                // ...
            });
    },
    async loginWithPhone({commit,rootState},{phoneNumber,recaptchaVerifier}) {
        console.log("user2",rootState.user)
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
    },

    async fetchUser(context ,user) {
      context.commit("SET_LOGGED_IN", user !== null);
      if (user) {
        context.commit("SET_USER", {
          displayName: user.displayName,
          email: user.email
        });
      } else {
        context.commit("SET_USER", null);
      }
  }
}
}



