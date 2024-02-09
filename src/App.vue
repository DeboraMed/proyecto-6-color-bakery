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
  <main class="container">
    <content class="container-div">
    <router-view />
    </content>
  </main>
  <Footer />
</template>

<style>
</style>
