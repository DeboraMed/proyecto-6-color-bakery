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
    <section class="container__section">
    <router-view />
    </section>
  </main>
  <Footer />
</template>

<style>
</style>
