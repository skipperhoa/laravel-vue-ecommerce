import { createStore } from 'vuex'
import { auth } from '../firebase/init'
import { userService } from '../_services'
import {signInWithPhoneNumber,fetchSignInMethodsForEmail,GithubAuthProvider,createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,GoogleAuthProvider, signInWithPopup,FacebookAuthProvider} from 'firebase/auth'


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
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            const response = await userService.register(user.providerData[0]);
            if (response.status === 200) {
                console.log("chay 1", response);
                commit('user/onLogin', response.data, { root: true });
                dispatch('cart/getAllCarts',null, { root: true })
                console.log("chay 4", response.value);

            }
        } catch (error) {
            console.error(error.message);
            throw error;
        }
    },
    async loginWithGithub({commit,rootState, dispatch}) {
        try {
            const provider = new GithubAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            console.log("GITHUB",user)
            const credential = await GithubAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const response = await userService.register(user.providerData[0]);
            if (response.status === 200) {
                console.log("chay 1", response);
                console.log("daata",response.data)
                commit('user/onLogin', response.data, { root: true });
                dispatch('cart/getAllCarts',null, { root: true })
                console.log("chay 4", response.value);

            }
        } catch (error) {
            console.log("Email",error.code)
            if (error.code === 'auth/account-exists-with-different-credential') {
                const email = error.customData.email;
                // Xác định phương thức đăng nhập đã sử dụng trước đó
                fetchSignInMethodsForEmail(auth, email)
                    .then((methods) => {
                        // Hiển thị thông tin cho người dùng để họ chọn cách đăng nhập
                        console.log("Tài khoản đã tồn tại với phương thức đăng nhập sau:", methods);
                        // Trong ví dụ này, chúng ta không thực hiện việc kết hợp tự động
                        // Thay vào đó, cung cấp hướng dẫn cho người dùng về cách kết hợp tài khoản
                         let message = "Tài khoản đã tồn tại với phương thức đăng nhập sau:"+ methods;
                         let _error={
                             isError:true,
                             provider:methods,
                             message: message
                         }
                         commit("user/error", _error, { root: true });
                    })
                    .catch((error) => {
                        // Xử lý lỗi nếu không thể xác định phương thức đăng nhập
                        console.error("Lỗi xác định phương thức đăng nhập:", error);
                    });
            } else {
                // Xử lý các lỗi khác
                console.error("Lỗi đăng nhập:", error);
            }
        }
    },

    async loginWithFacebook(context){

        try {
            const provider = new FacebookAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            const credential = FacebookAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            console.log("onFacebook", user);
            const response = await userService.register(user.providerData[0]);

            if (response.status === 200) {
                console.log("chay 1", response);
                commit('user/onLogin', response.data, { root: true });
                dispatch('cart/getAllCarts',null, { root: true })
                console.log("chay 4", response.value);
            }
        } catch (error) {
            console.error(error.message);
            throw error;
        }
       /* await  signInWithPopup(auth, provider)
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
            }); */
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



