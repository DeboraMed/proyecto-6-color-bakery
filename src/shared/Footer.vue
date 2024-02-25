<script setup>

</script>

<template>
  <footer>

    <!-- Footer main -->
    <section class="ft__main">
      <div class="ft__main__item">
        <img class="ft__title" src="../assets/img/color-bakery-texto-footer.svg" alt="ColorBakery">
        <ul>
          <li><a href="#">Inicio</a></li>
          <li><a href="#">Descubre</a></li>
          <li><a href="#">Regístrate</a></li>
          <li><a href="#">Logueate</a></li>
        </ul>
      </div>
      <div class="ft__main__item">
        <h2 class="ft__title">Sobre nosotros</h2>
        <ul>
          <li><a href="#">Inicio</a></li>
          <li><a href="#">Explorar</a></li>
          <li><a href="#">Favoritos</a></li>
          <li><a href="#">Perfil</a></li>
        </ul>
      </div>
      <div class="ft__main__item">
        <h2 class="ft__title">Comentanos</h2>
        <p>¿Tienes alguna pregunta, comentario o sugerencia? <br>¡Nos encantaría saber de ti! Utiliza nuestro formulario de contacto.</p>
        <form>
          <!-- <input type="email" name="email" placeholder="Enter email address">-->
          <router-link to="/contacto"><button class="button__sec"> Contacto</button></router-link>
        </form>
      </div>
    </section>

    <!-- Footer legal -->
    <section class="ft__legal">
      <ul class="ft__legal__list">
        <li><a href="#">Terminos y condiciones</a></li>
        <li><a href="#">Politica de privacidad</a></li>
        <li>&copy; 2024 Copyright Proyecto Vue/Laravel.</li>
      </ul>
    </section>
  </footer>
</template>

<style scoped>
/*footer general*/
footer {
  flex-shrink: 0;
  bottom: 0;
  width: 100%;
  color: #bbb;
  line-height: 1.5;
}
footer a {
  text-decoration: none;
  color: var(--a-color-ft);
}
footer a:hover {
  color: var(--a-color-hover);
}
footer p{
  color: #bbb;
}
.ft__title {
  color: #fff;
  font-family: "IBM Plex Mono", monospace;
  font-size: 1.375rem;
  padding-bottom: 0.625rem;
}
.ft__main {
  padding: 0.25rem 4.875rem;
  display: flex;
  flex-wrap: wrap;
  bottom: 0;
  background-color: var(--ft-bg-color-medium);
  text-decoration: none;
}
.ft__main__item {
  padding: 1.25rem;
  min-width: 12.5rem /*200px*/;
}
/*footer medias*/
@media only screen and (min-width: 29.8125rem /*477px*/) {
  .ft__main {
    justify-content: space-around;
  }
}
@media only screen and (min-width: 77.5rem /*1240px*/ ) {
  .ft__main {
    justify-content: space-evenly;
  }
}
/*contacto footer*/
form {
  display: flex;
  flex-wrap: wrap;
}
/*legal footer*/

.ft__legal {
  padding: 0.05rem 1.5rem;
  background-color: var(--ft-bg-color-dark);
}
.ft__legal__list {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.ft__legal__list li {
  margin: 0.125rem 0.625rem;
  white-space: nowrap;
}
/* one before the last child */
.ft__legal__list li:nth-last-child(2) {
  flex: 1;       /* same as flex-grow: 1; */
}
</style>