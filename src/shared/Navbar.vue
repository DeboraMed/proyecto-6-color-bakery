<script>
export default {
  data() {
    return {
      darkMode: false,
      isMenuOpen: false,
      openBurgerMenu: false,
      windowSmall: false
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    handleResize() {
      this.windowSmall = window.innerWidth <= 1200; // Cambia el tamaño según tus necesidades
    },
    toggleMenu() {
      this.openBurgerMenu = !this.openBurgerMenu;
    }
  }
}
</script>

<template>
  <section :class="{ 'dark-mode': darkMode }">
    <nav class="nav">
      <router-link to="/"><img src="../assets/color-bakery-logo-hor.svg" class="nav__logo"></router-link>
      <!-- Menu normal-->
      <ul class="navbar__content" v-if="!windowSmall">
        <input type="checkbox" class="toggle">
        <router-link v-show="!isMenuOpen" class="nav__router" to="/"><p>Inicio</p></router-link >
        <router-link v-show="!isMenuOpen" class="nav__router" to="/login"><p>Logueate</p></router-link>
        <router-link v-show="!isMenuOpen" class="nav__router" to="/registro"><p>Registrate</p></router-link>
        <router-link v-show="!isMenuOpen" class="nav__router" to="/perfil"><p>Perfil</p></router-link>
        <router-link v-show="!isMenuOpen" class="nav__router" to="/contacto"><p>Contacto</p></router-link>
        <router-link v-show="!isMenuOpen" class="nav__router" to="/proyectos"><p>Proyectos</p></router-link>
        <router-link v-show="!isMenuOpen" class="nav__router" to="/descubre"><button class="button">Descubre</button></router-link>
      </ul>
      <!-- Menu hamburguesa-->
      <ul v-else class="burger__menu">
        <button @click="toggleMenu" class="burger__button">&#9776;</button>
        <div v-if="openBurgerMenu" class="burger__menu__items">
        <button v-show="isMenuOpen" class="navbar-toggle" @click="toggleMenu">☰</button>
        <router-link v-show="!isMenuOpen" class="nav__router" to="/"><p>Inicio</p></router-link >
        <router-link v-show="!isMenuOpen" class="nav__router" to="/login"><p>Logueate</p></router-link>
        <router-link v-show="!isMenuOpen" class="nav__router" to="/registro"><p>Registrate</p></router-link>
        <router-link v-show="!isMenuOpen" class="nav__router" to="/perfil"><p>Perfil</p></router-link>
        <router-link v-show="!isMenuOpen" class="nav__router" to="/contacto"><p>Contacto</p></router-link>
        <router-link v-show="!isMenuOpen" class="nav__router" to="/proyectos"><p>Proyectos</p></router-link>
        <router-link v-show="!isMenuOpen" class="nav__router" to="/descubre"><button class="button">Descubre</button></router-link>
      </div>
      </ul>
    </nav>
  </section>
</template>

<style scoped>
/* menu hamburguesa*/
.burger__menu {
  display: flex;
  align-items: center;
  float: right;
  margin: 0 15px 0 0;
}
.burger__button {
  background: none;
  color: #2E2067;
  border: none;
  font-size: 2rem;
  cursor: pointer;
}
.burger__menu__items {
  display: none;
}
@media screen and (max-width: 1200px) {
  .toggle {
    display: none;
  }
  .burger__menu__items {
    display: block;
  }
}
/* boton Toggle */
.toggle {
  margin-top: 0.8rem;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 60px;
  height: 30px;
  border-radius: 30px;
  background-color: #333;
  position: absolute;
  transition: all 0.5s ease-in;
  cursor: pointer;
  z-index: 1;
}
.toggle::before {
  content: "";
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #EEE;
  position: absolute;
  top: 50%;
  left: 3px;
  transform: translateY(-50%);
  transition: all 0.5s ease-in;
}
.toggle:checked {
  background: #7563c7;
}
.toggle:checked::before {
  background: #333;
  left: 32px;
}

/* barra de navegacion */
.nav {
  z-index: 1;
  position:fixed ;
  width: 100%;
  height: 5.5rem;
  top: 0;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  background-color: #FFF8E8;
  margin: 0rem auto;

  align-items: center;
}
.navbar__content{
  display: flex;
  color: #f2f2f2;
  text-align: right;
  padding: 5px 5px;
  font-weight: bold;
  justify-content: right;
  flex-grow: 1;
}
.nav__router {
  text-decoration: none;
  display: flex;
  align-items: center;

}

.nav__logo{
  animation: palpito 2s ease 0s 1 normal forwards;
}

img{
  height: 4rem;
  margin-left: 4rem;
}
p{
  padding: 0rem;
  margin-right: 3rem;
}
button{
  background-color: #4c3b9a;
  color: #fff;
  border-radius: 1rem;
  cursor: pointer;
  border: 0;
  padding: 0.625rem 0.9375rem;
  margin-top: 0.3125rem;
  margin-right: 4rem;
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