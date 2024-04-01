
<template>
    <div>
        <nav-menu></nav-menu>
        <v-main>
          <!--The <slot> element is a slot outlet that indicates
                where the "VIEW" content should be rendered.-->
            <slot></slot>
        </v-main>
        <footer-component></footer-component>
    </div>
</template>
<script>
import NavMenu from '../components/NavMenu.vue'
import FooterComponent from '../components/FooterComponent.vue'

export default{
    name: "TheDefaultLayout",
    components:{
        NavMenu,
        FooterComponent,

    }
}
</script>

