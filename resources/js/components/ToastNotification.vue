<template>
    <transition name="toast-slide">
        <div v-if="isVisible" class="w-full max-w-sm fixed top-[20px] right-2 z-20">
            <div class="bg-green-400 text-center p-3 flex flex-row items-center justify-between rounded-[10px]">
                <div class="w-auto flex flex-row items-center">
                    <div>
                        <img src="https://100daysofcode.hoanguyenit.com/public/images/avatar.png"  class="w-[40px] h-[40px] block m-auto rounded-full"/>
                    </div>
                    <p class="pl-[10px] text-white text-sm">
                       {{ toastMessage }}
                    </p>
                </div>
                <span @click="closeToast" class="text-red-500 text-sm w-[20px] h-[20px] flex flex-cols justify-center bg-white rounded-full font-bold">X</span>
            </div>
        </div>
    </transition>
</template>

<script>
import { mapState , mapActions} from 'vuex';
export default {
    name: "ToastNotification",
    computed: {
        ...mapState({
            toastMessage: state => state.cart.toast.text,
            isVisible: state => state.cart.toast.show
        }),

    },
    created(){
        console.log("sa",this.isVisible)
    },
    methods: {
        ...mapActions({
            closeToast: 'cart/hideToast'
        }),
        closeToast() {
            //this.isVisible = false;
            this.$store.commit("cart/hideToast")

        }
    }
}
</script>

<style>
.toast-slide-enter-active, .toast-slide-leave-active {
    transition: all 0.5s;
}
.toast-slide-enter, .toast-slide-leave-to {
    opacity: 0;
    transform: translateY(-50%);
}
</style>
