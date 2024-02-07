<script>
import Navbar from "./shared/Navbar.vue";
import Footer from "./shared/Footer.vue";
export default {
  nombre:"App",
  components: {Navbar, Footer}
}
</script>

<template>
  <Navbar/>
  <div class="container">
    <div class="container-div">
    <router-view />
    </div>
  </div>
  <Footer />
</template>
<!--estilo importado para scss-->
<!--<style lang="scss" src="style.css"></style>-->
