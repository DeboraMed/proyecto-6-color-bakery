<script setup>
</script>

<template>
  <div class="nav">
    <div class="nav">
        <router-link to="/"><img src="../assets/color-bakery-logo-hor.svg"></router-link>
      <div class="navbar-content">
        <router-link class="nav-router" to="/"><p>Inicio</p></router-link >
        <router-link class="nav-router" to="/login"><p>Logueate</p></router-link>
        <router-link class="nav-router" to="/registro"><p>Registrate</p></router-link>
        <router-link class="nav-router" to="/perfil"><p>Perfil</p></router-link>
        <router-link class="nav-router" to="/contacto"><p>Contacto</p></router-link>
        <router-link class="nav-router" to="/proyectos"><p>Proyectos</p></router-link>
        <router-link class="nav-router" to="/descubre"><button>Descubre</button></router-link>
      </div>

    </div>
  </div>
</template>

<style scoped>
  img{
    height: 4rem;
    margin-left: 4rem;
  }
  p{
    padding: 0rem;
    margin-right: 4rem;
  }
  .nav {
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
  .navbar-content p:hover {
    color: black;
  }
  button{
    background-color: #C2431E;
    color: #fff;
    border-radius: 1rem;
    cursor: pointer;
    border: 0;
    padding: 0.625rem 0.9375rem;
    margin-top: 0.3125rem;
    margin-right: 4rem;
  }
</style>