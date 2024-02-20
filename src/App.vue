<script>
import Navbar from "./shared/Navbar.vue";
import Footer from "./shared/Footer.vue";
import BorderFooter from "./shared/BorderFooter.vue";

export default {
  nombre:"App",
  components: {BorderFooter, Navbar, Footer}
}
</script>

<template>
  <Navbar/>
  <main class="container">
    <router-view />
  </main>
  <BorderFooter></BorderFooter>
  <Footer />
</template>

<style>
</style>
