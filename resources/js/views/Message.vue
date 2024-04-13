<template>
    <div class="w-full">
        <div class="py-10 text-center ">
            <div class="w-[80px] rounded-full bg-white m-auto">
                    <img src="../assets/images/check.png"  class="block m-auto"/>
            </div>
            <h1 class="text-3xl font-bold my-5" v-if="isRegisger">You have register successfully</h1>
            <h1 class="text-3xl font-bold my-5" v-if="isLogin">You have login successfully</h1>
            <router-link to="/"><span class="w-[150px] m-auto block p-2 bg-green-400 text-white cursor-pointer">Continue</span></router-link>
        </div>
    </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
    name: "Message",
    computed: {
        ...mapState({
            isLogin: state => state.user.isLogin,
            isRegisger: state => state.user.isRegister

        })
    },

}

</script>
