<script setup>
</script>

<template>
  <div class="nav">
    <div class="nav">
        <router-link to="/"><img src="../assets/color-bakery-logo-hor.svg" class="nav-logo"></router-link>
      <div class="navbar-content">
        <router-link class="nav-router" to="/"><p>Inicio</p></router-link >
        <router-link class="nav-router" to="/login"><p>Logueate</p></router-link>
        <router-link class="nav-router" to="/registro"><p>Registrate</p></router-link>
        <router-link class="nav-router" to="/perfil"><p>Perfil</p></router-link>
        <router-link class="nav-router" to="/contacto"><p>Contacto</p></router-link>
        <router-link class="nav-router" to="/proyectos"><p>Proyectos</p></router-link>
        <router-link class="nav-router" to="/descubre"><button class="button">Descubre</button></router-link>
      </div>

    </div>
  </div>
</template>

<style scoped>
.nav-logo{
  animation: palpito 2s ease 0s 1 normal forwards;
}
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
  img{
    height: 4rem;
    margin-left: 4rem;
  }
  p{
    padding: 0rem;
    margin-right: 3rem;
  }
  /*barra de navegacion*/
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

    align-items: center; /* Añadido para centrar los elementos verticalmente */
  }
  .navbar-content{
    display: flex;
    color: #f2f2f2;
    text-align: right;
    padding: 5px 5px;
    font-weight: bold;
    justify-content: right; /* Añadido para justificar */
    flex-grow: 1; /* Añadido para que .navbar-content ocupe todo el espacio restante en la fila */
  }
  .nav-router {
    text-decoration: none;
  }
 /* .navbar-content p:hover {
    color: #4c3b9a;
  }*/
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
</style>