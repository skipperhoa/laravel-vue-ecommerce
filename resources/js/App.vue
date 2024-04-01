<template>

    <!-- Add this line: you don't need to import TheAppLayout
       because it is already registered as explained earlier  -->
    <div>
        <toast-notification></toast-notification>
        <!-- <nav>
    <router-link to="/">Go to Home</router-link>
    <router-link to="/detail/1">Go to About</router-link>
  </nav> -->
       <!-- <router-view></router-view> -->
        <the-app-layout></the-app-layout>
    </div>

</template>
<script>
 import TheAppLayout from './layouts/TheAppLayout.vue'
 import ToastNotification from './components/ToastNotification.vue'
 export default{
    components:{
        TheAppLayout,
        ToastNotification,
    },
    methods:{
        cong(){
            console.log("co");
        }
    }
 }
</script>

