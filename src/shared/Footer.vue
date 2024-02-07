<script setup>

</script>

<template>
  <footer>
    <!-- borde naranja -->
    <section class="ft-init">
      <ul class="ft-legal-list">
      </ul>
    </section>
    <!-- Footer main -->
    <section class="ft-main">
      <div class="ft-main-item">
        <h2 class="ft-title">Color Bakery</h2>
        <ul>
          <li><a href="#">Inicio</a></li>
          <li><a href="#">Descubre</a></li>
          <li><a href="#">Regístrate</a></li>
          <li><a href="#">Logueate</a></li>
        </ul>
      </div>
      <div class="ft-main-item">
        <h2 class="ft-title">Sobre nosotros</h2>
        <ul>
          <li><a href="#">Inicio</a></li>
          <li><a href="#">Explorar</a></li>
          <li><a href="#">Favoritos</a></li>
          <li><a href="#">Perfil</a></li>
        </ul>
      </div>
      <div class="ft-main-item">
        <h2 class="ft-title">Comentanos</h2>
        <p>¿Tienes alguna pregunta, comentario o sugerencia? <br>¡Nos encantaría saber de ti! Utiliza nuestro formulario de contacto.</p>
        <form>
          <!-- <input type="email" name="email" placeholder="Enter email address">-->
          <input type="button" value="Contacto">
        </form>
      </div>
    </section>

    <!-- Footer legal -->
    <section class="ft-legal">
      <ul class="ft-legal-list">
        <li><a href="#">Terminos y condiciones</a></li>
        <li><a href="#">Politica de privacidad</a></li>
        <li>&copy; 2024 Copyright Proyecto Vue/Laravel.</li>
      </ul>
    </section>
  </footer>

</template>

<style scoped>
/*footer general*/
  .ft-main {
    padding: 1.25rem 1.875rem;
    display: flex;
    flex-wrap: wrap;
    margin-left: 4rem;
    margin-right: 4rem;
  }
  .ft-main-item {
    padding: 1.25rem;
    min-width: 12.5rem /*200px*/;
  }
  /*footer medias*/
@media only screen and (min-width: 29.8125rem /*477px*/) {
  .ft-main {
    justify-content: space-around;
  }
}
@media only screen and (min-width: 77.5rem /*1240px*/ ) {
  .ft-main {
    justify-content: space-evenly;
  }
}
/*legal footer*/
.ft-init {
  padding: 0.9375rem 1.5rem;
  background-color: #FCBD7A;

}
/*contacto footer*/
form {
  display: flex;
  flex-wrap: wrap;
}
input[type="email"] {
  border: 0;
  padding: 0.625rem;
  margin-top: 0.3125rem;
}
input[type="button"] {
  background-color: #C2431E;
  color: #fff;
  border-radius: 1rem;
  cursor: pointer;
  border: 0;
  padding: 0.625rem 0.9375rem;
  margin-top: 0.3125rem;
}
/*legal footer*/
.ft-legal {
  padding: 0.9375rem 1.5rem;
  background-color: #2E2067;
}
.ft-legal-list {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.ft-legal-list li {
  margin: 0.125rem 0.625rem;
  white-space: nowrap;
}
/* one before the last child */
.ft-legal-list li:nth-last-child(2) {
  flex: 1;       /* same as flex-grow: 1; */
}
</style>