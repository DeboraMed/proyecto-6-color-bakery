<script setup>
// el codigo tiene que esta en un script setup
import {useThemeStore} from '../stores/ThemeStore';
const store = useThemeStore();
</script>

<script>
import DarkMode from "../pages/DarkMode.vue";

export default {
  components: {DarkMode},
  data() {
    return {
      isMenuOpen: false,
      openBurgerMenu: false,
      windowSmall: false
    }
  },
  mounted() {
    // escucha el cambio de tamaño y llama al metodo
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    handleResize() {
      this.windowSmall = window.innerWidth <= 1200; // Cambia el tamaño
    },
    toggleMenu() {
      this.openBurgerMenu = !this.openBurgerMenu;
    },
  },
}
</script>

<template>
  <section>
    <nav class="nav">
      <router-link to="/">
        <div v-if="store.theme === 'dark'"><img src="../assets/color-bakery-logo-hor.svg" class="nav__logo"></div>
        <div v-else><img src="../assets/color-bakery-logo.svg" class="nav__logo"></div>
      </router-link>
      <!-- Menu normal-->
      <ul class="navbar__content" v-if="!windowSmall">
        <router-link v-show="!isMenuOpen" class="nav__router" to="/"><p>Inicio</p></router-link >
        <router-link v-show="!isMenuOpen" class="nav__router" to="/login"><p>Logueate</p></router-link>
        <router-link v-show="!isMenuOpen" class="nav__router" to="/registro"><p>Registrate</p></router-link>
        <router-link v-show="!isMenuOpen" class="nav__router" to="/perfil"><p>Perfil</p></router-link>
        <router-link v-show="!isMenuOpen" class="nav__router" to="/contacto"><p>Contacto</p></router-link>
        <router-link v-show="!isMenuOpen" class="nav__router" to="/proyectos"><p>Proyectos</p></router-link>
        <router-link v-show="!isMenuOpen" class="nav__router" to="/descubre"><button class="button">Descubre</button></router-link>
        <dark-mode/>
      </ul>
      <!-- Menu hamburguesa-->
      <ul v-else class="burger__menu">
        <div v-if="openBurgerMenu" class="burger__menu__items">
          <button v-show="isMenuOpen" class="navbar-toggle" @click="toggleMenu">☰</button>
          <router-link v-show="!isMenuOpen" class="nav__router" to="/">Inicio</router-link >
          <router-link v-show="!isMenuOpen" class="nav__router" to="/login">Logueate</router-link>
          <router-link v-show="!isMenuOpen" class="nav__router" to="/registro">Registrate</router-link>
          <router-link v-show="!isMenuOpen" class="nav__router" to="/perfil">Perfil</router-link>
          <router-link v-show="!isMenuOpen" class="nav__router" to="/contacto">Contacto</router-link>
          <router-link v-show="!isMenuOpen" class="nav__router" to="/proyectos">Proyectos</router-link>
          <router-link v-show="!isMenuOpen" class="nav__router" to="/descubre"><button class="button">Descubre</button></router-link>
        </div>
        <button @click="toggleMenu" class="burger__button">&#9776;</button>
      </ul>
    </nav>
  </section>
</template>

<style scoped>
/* menu hamburguesa*/
.burger__menu {
  position: absolute;
  align-items: flex-start;
  display: flex;
  right: 5px;
  margin: 0 15px 0 0;
}
.burger__menu__items {
  padding: 1rem;
  display: none;
}
.burger__button {
  background: none;
  color: #2E2067;
  border: none;
  font-size: 2rem;
  cursor: pointer;
}

@media screen and (max-width: 1200px) {
  .toggle {
    display: none;
  }
  .burger__menu__items {
    display: block;
  }
}
/* barra de navegacion */
.nav {
  z-index: 3;
  position:fixed ;
  width: 100%;
  height: 5.5rem;
  top: 0;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  background-color: var(--bg-color-clear);
  margin: 0 auto;

  align-items: flex-start;
}
a:hover {

}
.navbar__content{
  display: flex;
  text-align: right;
  padding: 5px 5px;
  font-weight: bold;
  justify-content: right;
  flex-grow: 0.85;
}
.nav__router {
  padding: 0.2rem;
  text-decoration: none;
  display: flex;
  align-items: center;
}
.nav__router a{
  color: var(--a-color);
}
.nav__router a:hover{
  color: var(--a-color-hover);
}

.nav__logo{
  margin-top: 1rem;
  animation: palpito 2s ease 0s 1 normal forwards;
}

img{
  height: 4rem;
  margin-left: 4rem;
}

/* animación del logotipo */
@keyframes palpito {
  0% {
    animation-timing-function: ease-out;
    transform: scale(1);
    transform-origin: center center;
  }

  10% {
    animation-timing-function: ease-in;
    transform: scale(0.91);
  }

  17% {
    animation-timing-function: ease-out;
    transform: scale(0.98);
  }

  33% {
    animation-timing-function: ease-in;
    transform: scale(0.87);
  }

  45% {
    animation-timing-function: ease-out;
    transform: scale(1);
  }
}
</style>